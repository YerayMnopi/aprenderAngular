import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private analyticsService: AnalyticsService,
    private postService: PostsService,
    private router: Router,
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

  goToFirstPost() {
    this.router.navigate(['articulos', 'destruye-las-4-barreras-de-angular']);
  }
}