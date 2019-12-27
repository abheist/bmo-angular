import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;

  constructor(private server: ServerService, private authService: AuthService) { }

  ngOnInit() {
    this.server.request('GET', '/api/v1/rest-auth/user/').subscribe((user: any) => {
      if (user) {
        this.name = user.first_name + user.last_name;
        this.email = user.email;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
