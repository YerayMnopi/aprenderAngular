import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/* Services */
import { ApiService } from './api.service';

// Models
import { User } from '../shared/models/user';

@Injectable()
export class UserService {

  private endPoint = 'auth/';

  private user: User = {
    username: '',
    token: ''
  };

  private localStorageRef: any;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('WINDOWREF') private windowRef: any,
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
      .pipe(map(
        (response: {token: string}) => {
          if (response.token) {
            this.setUser(username, response.token);
            this.saveUser();
          }
          return !!response.token;
        }
      ));
  }

  verify(): Observable<boolean> {
    if (this.user.token) {
      return this.apiService.post('token-verify/', {token: this.user.token})
      .pipe(map(
        (response: {token: string}) => {
          const token =  response && response.token;

          if (token) {
            this.setUser(this.user.username, response.token);
          }

          return !!(token);
        }
      ));
    } else {
      return of(false);
    }

  }

  private deleteToken() {
    this.user.token = '';
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageRef.setItem('token', this.user.token);
    }
  }

  private getUserFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageRef = this.windowRef.localStorage;
      const username = this.localStorageRef.getItem('username');
      const token = this.localStorageRef.getItem('token');

      if (username || token) {
        this.setUser(username, token);
      }
    }
  }

  private saveUser() {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageRef.setItem('username', this.user.username);
      this.localStorageRef.setItem('token', this.user.token);
    }
  }
}