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

  editMode: string;

  deleteMode = false;

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

  addTextElement() {
      this.post.body.body.push({
          type: 'text',
          heading: 'Nuevo bloque de texto',
          content: ['Escribe aquí']
      });
  }

  addImageElement() {
    this.post.body.body.push({
        type: 'image',
        heading: 'Nueva imagen',
        content: ['slug de la imagen']
    });
  }

  addCodeElement() {
      this.post.body.body.push({
          type: 'code',
          heading: 'Código',
          content: ['const index = 0;']
      });
  }

  activateDeleteMode() {
      this.deleteMode = true;
  }

  deActivateDeleteMode() {
    this.deleteMode = false;
  }

  savePost() {
      this.postsService.savePostExceptImage(this.post).subscribe(
          (response) => console.log(response)
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

  checkParagraph(elementIndex: number, paragraphIndex: number) {
    const splitParagraphCode = '\n\n';
    let paragraph: string = this.post.body.body[elementIndex].content[paragraphIndex];

    if (paragraph.indexOf(splitParagraphCode) > -1) {
        let paragraphs: string[];
        paragraphs = paragraph.split(splitParagraphCode);
        
        this.post.body.body[elementIndex].content.splice(paragraphIndex, 1, paragraphs[0], paragraphs[1]);

        this.toggleEditMode(elementIndex, 'content', paragraphIndex + 1);
    }
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