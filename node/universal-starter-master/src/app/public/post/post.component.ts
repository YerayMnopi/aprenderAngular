import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Models */
import { Post } from "../../shared/models/posts";

/* Services */
import { PostsService } from '../../core/posts.service';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    post: Post;

    constructor(
        private activatedRoute: ActivatedRoute,
        private postsService: PostsService
    ) {}

    ngOnInit() {
        this.getPost();
    }

    private getPost() {
        this.activatedRoute.data.subscribe(
            (data) => {
                this.post = data.post;
                this.postsService.setSeoTags(this.post);
            }
        );
    }
}