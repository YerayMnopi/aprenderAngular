import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

/* Components */
import { LogoComponent } from './components/logo/logo.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SectionComponent } from './components/section/section.component';
import { ImageComponent } from './components/image/image.component';

/* Pipes */
import { ParseMarkdownPipe } from './pipes/parse-markdown.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LogoComponent,
    PostPreviewComponent,
    SectionComponent,
    SignUpComponent,
    ImageComponent,
    ParseMarkdownPipe
  ],
  exports: [
    CommonModule,
    LogoComponent,
    PostPreviewComponent,
    SectionComponent,
    SignUpComponent,
    ImageComponent,
    ParseMarkdownPipe
  ]
})
export class SharedModule { }
