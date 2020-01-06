import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private server: ServerService, private authService: AuthService) { }

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

  logout() {
    this.authService.logout();
  }

}
