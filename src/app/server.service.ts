import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private loggedIn = false;
  private key: string;

  constructor(private http: HttpClient) { }

  setLoggedIn(loggedIn: boolean, key?: string) {
    this.loggedIn = loggedIn;
    this.key = key;
  }

  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }

    const header = (this.loggedIn) ? { Authorization: `Token ${this.key}` } : undefined;

    return this.http.request(method, baseUrl + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  get(route: string, data?: any) {
    const header = (this.loggedIn) ? { Authorization: `Token ${this.key}` } : undefined;

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(baseUrl + route, {
      responseType: 'json',
      headers: header,
      params
    });
  }
}
