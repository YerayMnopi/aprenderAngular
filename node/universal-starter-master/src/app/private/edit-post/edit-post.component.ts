import { Component, OnInit } from '@angular/core';

/* Services */
import { PostsService } from '../../core/posts.service';

/* Models */
import { Post } from "../../shared/models/posts";

@Component({
  selector: 'private-edit-component',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

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