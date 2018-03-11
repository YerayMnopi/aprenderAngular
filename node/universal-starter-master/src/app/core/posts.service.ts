import { Injectable } from '@angular/core';

/* Services */
import { ApiService } from './api.service';

@Injectable()
export class PostsService {

    postEndpoint = 'posts';

    constructor(
        private apiService: ApiService
    ){}

    getPosts() {
        return this.apiService.get(this.postEndpoint);
    }

    getPost(slug: string) {
        return this.apiService.get(this.postEndpoint + '/' + slug);
    }
}