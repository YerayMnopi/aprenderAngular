import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Models */
import { Post, PostPreview } from "../../shared/models/posts";

/* Services */
import { PostsService } from '../../core/posts.service';
import { AnalyticsService } from '../analytics.service';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    post: Post;
    relatedPost: PostPreview[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private analyticsService: AnalyticsService,
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
                this.getRelatedPosts();
                this.analyticsService.sendPageView('articulos/' + this.post.slug);
            }
        );
    }

    private getRelatedPosts() {
        this.postsService.getRelatedPost(this.post.id).subscribe(
            (relatedPost) => this.relatedPost = relatedPost
        );
    }
}