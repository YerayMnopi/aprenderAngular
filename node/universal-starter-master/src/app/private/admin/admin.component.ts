import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
    private postService: PostsService,
    private router: Router
  ) {}

  posts: Post[];

  ngOnInit() {
    this.getPost();
  }

  createBlankPost() {
    this.postService.createBlankPost().subscribe(
      (newPost: Post) => this.router.navigate(['editar', newPost.slug])
    );
  }

  private getPost() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => this.posts = posts,
      (error) => {
        throw (new Error(error.message));
      }
    );
  }
}