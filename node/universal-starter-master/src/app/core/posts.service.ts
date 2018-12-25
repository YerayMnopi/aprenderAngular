import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/* Rxjs */
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


/* Services */
import { ApiService } from './api.service';

/* Models */
import {Post, PostPreview, PostBodyElement} from "../shared/models/posts";

@Injectable()
export class PostsService {

    private postEndpoint = 'posts/';

    private publishedPosts: PostPreview[];

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
            return of(this.publishedPosts);
        } else {
            return this.apiService.get(this.postEndpoint + 'published/').pipe(
                map(
                (publishedPosts: PostPreview[]) => { 
                    this.publishedPosts = publishedPosts;
                    return this.publishedPosts;
                }
            ));
        }
    }

    getRelatedPost(postId: Number): Observable<PostPreview[]> {
        return this.getPublishedPosts().pipe(map(
            (publishedPosts) => publishedPosts.filter(
                (publishedPost) => publishedPost.id !== postId
            )
        ));
    }

    getPost(slug: string) {
        return this.apiService.get(this.postEndpoint + slug + '/');
    }

    createBlankPost() {
        return this.apiService.post(this.postEndpoint + 'blank/', {})
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
        this.titleService.setTitle(post.title + ' | Curso de angular gratuito');

        tags.forEach(
            (tag) => {
                this.metaService.updateTag(
                    {content: tag.content},
                    tag.type + "='" + tag.name +"'"
                );
            }
        );

    }

    getHeadings(post: Post): {index: number, text: string}[] {
        return post.body.body
            .map(
                (bodyElement: PostBodyElement, index: number) => {
                    if (bodyElement.heading) {
                        return {
                            text: bodyElement.heading,
                            index: index
                        };
                    }
                }
            )
            .filter(
                (heading) => !!heading
            );
    }
}