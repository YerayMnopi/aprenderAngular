import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/* Services */
import { ApiService } from './api.service';

/* Models */
import {Post} from "../shared/models/posts";

@Injectable()
export class PostsService {

    postEndpoint = 'posts/';

    constructor(
        private apiService: ApiService,
        private titleService: Title,
        private metaService: Meta,
    ){}

    getPosts() {
        return this.apiService.get(this.postEndpoint);
    }

    getPost(slug: string) {
        return this.apiService.get(this.postEndpoint + slug + '/');
    }

    savePost(postToSave: Post) {
        return this.apiService.put(this.postEndpoint + postToSave.slug + '/', postToSave);
    }

    setSeoTags(post: Post) {
        const tags = [
            {
                name: 'description',
                type: 'name',
                content: post.description
            },
            {
                name: 'og:title',
                type: 'property',
                content: post.title
            },
            {
                name: 'og:description',
                type: 'property',
                content: post.description
            },
            {
                name: 'og:image',
                type: 'property',
                content: post.image.image
            },
            {
                name: 'og:image:type',
                type: 'property',
                content: 'image/jpeg'
            },
            {
                name: 'og:image:width',
                type: 'property',
                content: post.image.width.toString()
            },
            {
                name: 'og:image:height',
                type: 'property',
                content: post.image.height.toString()
            },
        ];
        this.titleService.setTitle(post.title + ' | Aprender Angular');

        for (let tag of tags) {
            this.metaService.updateTag({
                    content: tag.content
                },
                tag.type + "='" + tag.name +"'"
            );
        }

    }
}