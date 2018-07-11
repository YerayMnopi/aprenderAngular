import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  private NEW_ELEMENT_CODE = environment.newElementCode;

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
        content: [this.NEW_ELEMENT_CODE]
    });
    this.toggleEditMode(elementIndex, 'content', 0);
  }

  addImageElement(elementIndex: number) {
    this.post.body.body.splice(elementIndex + 1, 0, {
        type: 'image',
        content: [this.NEW_ELEMENT_CODE]
    });
    this.toggleEditMode(elementIndex, 'content', 0);
  }

  addCodeElement(elementIndex: number) {
    this.post.body.body.splice(elementIndex + 1, 0, {
        type: 'code',
        content: [this.NEW_ELEMENT_CODE]
    });
    this.toggleEditMode(elementIndex, 'content', 0);
  }

  addHeadingToElement(elementIndex: number) {
    if (this.post.body.body[elementIndex]['heading']) {
        delete this.post.body.body[elementIndex]['heading'];
    } else {
        this.post.body.body[elementIndex]['heading'] = this.NEW_ELEMENT_CODE;
        this.toggleEditMode(elementIndex, 'heading');
    }
  }

  addParagraph(elementIndex: number, paragraphIndex: number) {
    this.post.body.body[elementIndex].content.splice(paragraphIndex + 1, 0, this.NEW_ELEMENT_CODE);
    this.toggleEditMode(elementIndex, 'content', paragraphIndex + 1);
  }


  checkParagraph(event: KeyboardEvent, elementIndex: number, paragraphIndex: number) {
    if (event.keyCode === 13 || event.which === 13 || event.charCode === 13){
        event.preventDefault();
        this.addParagraph(elementIndex, paragraphIndex);
    }
  }

  deleteElement(elementIndex: number,  paragraphIndex?: number){
    if (paragraphIndex) {
        this.post.body.body[elementIndex].content.splice(paragraphIndex, 1);
    } else {
        this.post.body.body.splice(elementIndex, 1);
    }

  }

  activateDeleteMode() {
      this.deleteMode = true;
  }

  deActivateDeleteMode() {
    this.deleteMode = false;
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

  private getPost() {
      this.activatedRoute.data.subscribe(
          (data) => {
              this.post = data.post;
          }
      );
  }
}