import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/* Rxjs */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/* Services */
import { ApiService } from './api.service';

/* Models */
import {Post, PostPreview} from "../shared/models/posts";

@Injectable()
export class PostsService {

    postEndpoint = 'posts/';

    publishedPosts: PostPreview[];

    constructor(
        private apiService: ApiService,
        private titleService: Title,
        private metaService: Meta,
    ){}

    getPosts(): Observable<any> {
        return this.apiService.get(this.postEndpoint);
    }

    getPublishedPosts(): Observable<PostPreview[]> {
        if (this.publishedPosts) {
            return Observable.of(this.publishedPosts);
        } else {
            return this.apiService.get(this.postEndpoint + 'published/').map(
                (publishedPosts: PostPreview[]) => { 
                    this.publishedPosts = publishedPosts;
                    return this.publishedPosts;
                }
            );
        }
    }

    getRelatedPost(postId: Number): Observable<PostPreview[]> {
        return this.getPublishedPosts().map(
            (publishedPosts) => publishedPosts.filter(
                (publishedPost) => publishedPost.id !== postId
            )
        );
    }

    getPost(slug: string) {
        return this.apiService.get(this.postEndpoint + slug + '/');
    }

    savePostExceptImage(postToSave: Post) {
        const postWithoutImage = JSON.parse(JSON.stringify(postToSave));
        delete postWithoutImage.image;
        delete postWithoutImage.category;
        return this.apiService.patch(this.postEndpoint + postToSave.slug + '/', postWithoutImage);
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