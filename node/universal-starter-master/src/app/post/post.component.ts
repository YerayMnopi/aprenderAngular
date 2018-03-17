import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Services */
import { PostsService } from '../core/posts.service';

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
        private postService: PostsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getPost();
    }

    getPost() {
        this.post = this.activatedRoute.snapshot.data.post;
    }
}