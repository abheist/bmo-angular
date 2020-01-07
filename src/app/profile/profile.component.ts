import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { EditprofileComponent } from './editprofile/editprofile.component';

export interface TableDataStructure {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  personalName: string;
  personalEmail: string;

  constructor(
    private server: ServerService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff'];
  dataSource: MatTableDataSource<TableDataStructure>;

  ngOnInit() {
    this.server.request('GET', '/api/v1/rest-auth/user/').subscribe((user: any) => {
      if (user) {
        this.personalName = user.first_name + user.last_name;
        this.personalEmail = user.email;
      }
    });

    this.server.request('GET', '/api/v1/users/').subscribe((data: any) => {
      if (data) {
        this.dataSource = data.results;
      }
    });
  }

  editProfile(): void {
    const dialogRef = this.dialog.open(EditprofileComponent, {
      width: '720px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  logout() {
    this.authService.logout();
  }

}
