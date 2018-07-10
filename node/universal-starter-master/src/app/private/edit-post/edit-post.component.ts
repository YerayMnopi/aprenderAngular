import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  editMode: string;

  deleteMode = false;

  savePostFeedback: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      private postsService: PostsService
  ) {}

  ngOnInit() {
      this.getPost();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addTextElement(elementIndex: number) {
      this.post.body.body.splice(elementIndex + 1, 0, {
          type: 'text',
          heading: 'Nuevo heading',
          content: ['Nuevo parrafo']
      });
  }

  addImageElement(elementIndex: number) {
    this.post.body.body.splice(elementIndex + 1, 0, {
        type: 'image',
        heading: 'Nueva imagen',
        content: ['slug de la imagen']
    });
  }

  addCodeElement(elementIndex: number) {
      this.post.body.body.splice(elementIndex + 1, 0, {
          type: 'code',
          heading: 'Nuevo heading',
          content: ['Nuevo parrafo']
      });
  }

  activateDeleteMode() {
      this.deleteMode = true;
  }

  deActivateDeleteMode() {
    this.deleteMode = false;
  }

  savePost() {
    this.savePostFeedback = '';
    this.postsService.savePostExceptImage(this.post).subscribe(
        (response: Post) => {
            this.post = response;
            let currentdate = new Date(); 
            this.savePostFeedback = 'Post actualizado correctamente a ' + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
        },
        (error: HttpErrorResponse) => this.savePostFeedback = 'Algo ha salido mal al guardar el post (' + error.status + '). Prueba de nuevo por fa.'

    );
  }

  toggleEditMode(elementIndex: number | string, subelement?: string,  paragraphIndex?: number) {
      if (this.checkEditMode(elementIndex, subelement, paragraphIndex)) {
        this.editMode = '';
      } else {
        setTimeout(
            () => this.editMode = (elementIndex + subelement + paragraphIndex),
            100
        );
      }
  }

  checkEditMode(elementIndex: number | string, subelement?: string,  paragraphIndex?: number) {
    return this.editMode === (elementIndex + subelement + paragraphIndex);
  }

  addParagraph(elementIndex: number, paragraphIndex: number) {
    this.post.body.body[elementIndex].content.splice(paragraphIndex + 1, 0, 'Escribe aquí');
    this.toggleEditMode(elementIndex, 'content', paragraphIndex + 1);
  }

  deleteElement(elementIndex: number,  paragraphIndex?: number){
    if (paragraphIndex) {
        this.post.body.body[elementIndex].content.splice(paragraphIndex, 1);
    } else {
        this.post.body.body.splice(elementIndex, 1);
    }

  }

  private getPost() {
      this.activatedRoute.data.subscribe(
          (data) => {
              this.post = data.post;
          }
      );
  }
}