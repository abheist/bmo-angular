import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private key: string;

  getLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.key = user.key;
      this.server.setLoggedIn(true, this.key);
      this.loggedIn.next(true);
    }
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  login(user) {
    if (user.username !== '' && user.password !== '') {
      return this.server.request('POST', '/api/v1/rest-auth/login/', {
        username: user.username,
        password: user.password
      }).subscribe((response: any) => {
        if (response.key !== undefined) {
          this.key = response.key;
          this.server.setLoggedIn(true, this.key);
          this.loggedIn.next(true);
          const userData = {
            key: this.key
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigateByUrl('/profile');
        }
      });
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.key;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
