import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators/retry';
import { environment } from '../../environments/environment'

@Injectable()
export class ApiService {

    apiUrl: string;

    constructor(
        private httpClient: HttpClient
    ){
        this.apiUrl = environment.apiUrl;
    }

    get(endpoint: string) {
        return this.httpClient.get(this.apiUrl + endpoint);
    }
}