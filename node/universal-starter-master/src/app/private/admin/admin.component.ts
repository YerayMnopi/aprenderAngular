import { Component, OnInit } from '@angular/core';

/* Services */
import { PostsService } from '../../core/posts.service';

/* Models */
import { Post } from "../../shared/models/posts";

@Component({
  selector: 'private-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor (
    private postService: PostsService
  ) {}

  posts: Post[];

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => this.posts = posts,
      (error) => {
        throw (new Error(error.message));
      }
    );
  }
}