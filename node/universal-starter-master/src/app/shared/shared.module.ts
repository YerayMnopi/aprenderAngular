import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

/* Components */
import { LogoComponent } from './logo/logo.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SectionComponent } from './section/section.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LogoComponent,
    PostPreviewComponent,
    SectionComponent,
    SignUpComponent
  ],
  exports: [
    CommonModule,
    LogoComponent,
    PostPreviewComponent,
    SectionComponent,
    SignUpComponent
  ]
})
export class SharedModule { }
