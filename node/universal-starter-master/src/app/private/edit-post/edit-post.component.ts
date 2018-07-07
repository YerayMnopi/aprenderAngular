import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Models */
import { Post } from "../../shared/models/posts";

/* Services */
import { PostsService } from '../../core/posts.service';

@Component({
  selector: 'private-edit-component',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;

  editMode = false;

  constructor(
      private activatedRoute: ActivatedRoute,
      private postsService: PostsService
  ) {}

  ngOnInit() {
      this.getPost();
  }

  editParagraph(elementIndex: number, paragraphIndex: number) {
    console.log(elementIndex + ' - ' + paragraphIndex);
    console.log(this.post.body.body[elementIndex][paragraphIndex]);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addTextElement() {
      this.post.body.body.push({
          type: 'text',
          heading: 'Nuevo bloque de texto',
          content: ['Escribe aquí']
      });
  }

  savePost() {
      this.postsService.savePostExceptImage(this.post).subscribe(
          (response) => console.log(response)
      );
  }

  toggleEditMode() {
      this.editMode = !this.editMode;
  }

  private getPost() {
      this.activatedRoute.data.subscribe(
          (data) => {
              this.post = data.post;
          }
      );
  }
}