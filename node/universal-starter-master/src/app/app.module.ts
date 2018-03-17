import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";

import { PostResolver } from './post/post.resolve';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'articulos/:slug', component: PostComponent, resolve: {post: PostResolver} },
      { path: 'registro', component: SignUpComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ]),
    SharedModule
  ],
  providers: [
    PostResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
