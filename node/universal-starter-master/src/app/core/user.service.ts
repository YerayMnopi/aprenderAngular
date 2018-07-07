import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

/* Services */
import { ApiService } from './api.service';

// Models
import { User } from '../shared/models/user';

@Injectable()
export class UserService {

  private endPoint = 'auth/';

  private user = new User();

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.getUserFromLocalStorage();
  }

  getUser() {
    return this.user;
  }

  setUser(username: string, token: string) {
    this.user.username = username;
    this.user.token = token;
    this.apiService.setToken(token);
  }

  authenticate(username: string, password: string): Observable<boolean> {
    const credentials = {
      username: username,
      password: password
    };

    return this.apiService.post(this.endPoint, credentials)
      .map(
        (response: {token: string}) => {
          if (response.token) {
            this.setUser(username, response.token);
            this.saveUser();
          }
          return !!response.token;
        }
      );
  }


  private getUserFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
        const username = window.localStorage.getItem('username');
        const token = window.localStorage.getItem('token');

        if (username) {
            this.setUser(username, token);
        }
    }
  }

  private saveUser() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('username', this.user.username);
      window.localStorage.setItem('token', this.user.token);
    }
  }
}