import { Injectable } from '@angular/core';

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
    private apiService: ApiService
  ) {}

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
          }
          return !!response.token;
        }
      );
  }

}