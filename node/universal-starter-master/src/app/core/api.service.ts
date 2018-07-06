import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/operators/retry';
import { environment } from '../../environments/environment'

@Injectable()
export class ApiService {

    apiUrl: string;

    requestOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    constructor(
        private httpClient: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        //@Inject('LOCALSTORAGE') private localStorage: any
    ){
        this.getApiUrl();
        this.getTokenFromLocalStorage();
    }

    get(endpoint: string) {
        return this.httpClient.get(this.apiUrl + endpoint, this.requestOptions);
    }

    post(endpoint: string, body: Object) {
        return this.httpClient.post(this.apiUrl + endpoint, body, this.requestOptions);
    }

    patch(endpoint: string, body: any) {
        return this.httpClient.patch(this.apiUrl + endpoint, body, this.requestOptions);
    }

    put(endpoint: string, body: any) {
        return this.httpClient.put(this.apiUrl + endpoint, body, this.requestOptions);
    }

    setToken(token: string) {
        this.requestOptions.headers = this.requestOptions.headers.append('Authorization', 'JWT ' + token);
        
        if (isPlatformBrowser(this.platformId)) {
            window.localStorage.setItem('token', token);
        }
    }

    private getApiUrl() {
        if (isPlatformServer(this.platformId)) {
            this.apiUrl = environment.serverSideApiUrl;
        } else {
            this.apiUrl = environment.apiUrl;
        }
    }

    private getTokenFromLocalStorage() {
        if (isPlatformBrowser(this.platformId)) {
            const token = window.localStorage.getItem('token');

            if (token) {
                this.setToken(token);
            }
        }
    }
}