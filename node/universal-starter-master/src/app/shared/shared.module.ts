import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* Components */
import { LogoComponent } from './components/logo/logo.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { SectionComponent } from './components/section/section.component';
import { ImageComponent } from './components/image/image.component';
import { PostListComponent } from './components/post-list/post-list.component';


/* Pipes */
import { ParseMarkdownPipe } from './pipes/parse-markdown.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    LogoComponent,
    PostPreviewComponent,
    SectionComponent,
    ImageComponent,
    PostListComponent,
    ParseMarkdownPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    LogoComponent,
    PostPreviewComponent,
    SectionComponent,
    ImageComponent,
    PostListComponent,
    ParseMarkdownPipe
  ]
})
export class SharedModule { }
