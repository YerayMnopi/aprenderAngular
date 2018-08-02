import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Models */
import { Post, PostPreview, PostBodyElement } from "../../shared/models/posts";

/* Services */
import { PostsService } from '../../core/posts.service';
import { AnalyticsService } from '../analytics.service';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    host: {
        ['role']: 'article'
    }
})
export class PostComponent implements OnInit {

    post: Post;
    headings: {index: number, text: string}[];
    relatedPost: PostPreview[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private analyticsService: AnalyticsService,
        private postsService: PostsService,
        @Inject('WINDOWREF') private windowRef: any,
    ) {}

    ngOnInit() {
        this.getPost();
    }

    scrollToHeading(headingIndex: number) {
        const element = this.windowRef.document.getElementById('heading' + headingIndex);
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    private getPost() {
        this.activatedRoute.data.subscribe(
            (data) => {
                this.post = data.post;
                this.getRelatedPosts();
                this.getHeadings();
                this.analyticsService.sendPageView('articulos/' + this.post.slug);
                this.postsService.setSeoTags(this.post);
            }
        );
    }

    private getRelatedPosts() {
        this.postsService.getRelatedPost(this.post.id).subscribe(
            (relatedPost) => this.relatedPost = relatedPost
        );
    }

    private getHeadings() {
        this.headings = this.postsService.getHeadings(this.post);
    }
}