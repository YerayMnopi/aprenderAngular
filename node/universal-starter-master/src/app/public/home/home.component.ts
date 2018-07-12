import { Component, OnInit } from '@angular/core';

/* Services */
import { PostsService } from '../../core/posts.service';
import { AnalyticsService } from '../analytics.service';

/* Models */
import { Post } from "../../shared/models/posts";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  constructor(
    private postService: PostsService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.getPost();
    this.analyticsService.sendPageView('');
  }

  getPost() {
    this.postService.getPublishedPosts().subscribe(
      (posts: Post[]) => this.posts = posts,
      (error) => {
        throw (new Error(error.message));
      }
    );
  }
}