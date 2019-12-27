import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bmo-angular';

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }
}
