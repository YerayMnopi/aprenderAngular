import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators/retry';
import { environment } from '../../environments/environment'

@Injectable()
export class ApiService {

    apiUrl: string;

    constructor(
        private httpClient: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ){
        this.getApiUrl();
    }

    get(endpoint: string) {
        return this.httpClient.get(this.apiUrl + endpoint);
    }

    private getApiUrl() {
        if (isPlatformServer(this.platformId)) {
            this.apiUrl = environment.serverSideApiUrl;
        } else {
            this.apiUrl = environment.apiUrl;
        }
    }
}