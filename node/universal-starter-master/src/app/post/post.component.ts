import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';


/* Models */
import { Post } from "../shared/models/posts";

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    post: Post;

    constructor(
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private metaService: Meta,
    ) {}

    ngOnInit() {
        this.getPost();
        this.setSeoTags();
    }

    private getPost() {
        this.activatedRoute.data.subscribe(
            (data) => this.post = data.post
        );
    }

    private setSeoTags() {
        const tags = [
            {
                name: 'description',
                content: this.post.description
            },
            {
                name: 'og:title',
                content: this.post.title
            },
            {
                name: 'og:description',
                content: this.post.description
            },
            {
                name: 'og:image',
                content: this.post.image
            },
        ];
        this.titleService.setTitle(this.post.title + ' | Aprender Angular');

        for (let tag of tags) {
            this.metaService.updateTag({
                    content: tag.content
                },
                "property='" + tag.name +"'"
            );
        }

    }
}