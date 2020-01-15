import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  private key: string;

  getLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private server: ServerService,
    private snackBar: MatSnackBar
  ) {
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
        if (response.key && (response.key !== undefined)) {
          this.key = response.key;
          this.server.setLoggedIn(true, this.key);
          this.loggedIn.next(true);
          const userData = {
            key: this.key
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigateByUrl('/profile');
        }
      }, (response: any) => {
        this.snackBar.open(Object.values(response.error)[0][0], '', {
          duration: 2000,
        });
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
