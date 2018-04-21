import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

/* Components */
import { LogoComponent } from './logo/logo.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SectionComponent } from './section/section.component';
import { ImageComponent } from './image/image.component';

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
    ImageComponent
  ],
  exports: [
    CommonModule,
    LogoComponent,
    PostPreviewComponent,
    SectionComponent,
    SignUpComponent,
    ImageComponent
  ]
})
export class SharedModule { }
