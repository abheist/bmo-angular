import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { EditaccountComponent } from './editaccount/editaccount.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

export interface TableDataStructure {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: boolean;
  edit: any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  personalName: string;
  personalEmail: string;
  personalId: number;
  personalUserType: number;

  USER_TYPE = {
    1: 'user',
    2: 'admin',
    3: 'superuser'
  };

  constructor(
    private server: ServerService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'email', 'user_type'];
  dataSource: MatTableDataSource<TableDataStructure>;

  ngOnInit() {
    this.server.request('GET', '/api/v1/rest-auth/user/').subscribe((user: any) => {
      if (user) {
        this.personalName = user.first_name + user.last_name;
        this.personalEmail = user.email;
        this.personalId = user.id;
        this.personalUserType = user.user_type;
      }
      if (this.personalUserType > 1) {
        this.displayedColumns.push('edit');
      }
    });

    this.server.request('GET', '/api/v1/user/').subscribe((data: any) => {
      if (data) {
        this.dataSource = data.results;
      }
    });
  }

  editAccount(userId: number): void {
    const dialogRef = this.dialog.open(EditaccountComponent, {
      width: '720px',
      data: { userId }
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  editProfile(userId: number): void {
    const dialogRef = this.dialog.open(EditprofileComponent, {
      width: '720px',
      data: { userId }
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  logout() {
    this.authService.logout();
  }

}
