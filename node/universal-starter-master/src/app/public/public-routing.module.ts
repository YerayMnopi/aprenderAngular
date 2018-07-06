import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// Resolves
import { PostResolver } from '../core/post.resolve';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'articulos/:slug', component: PostComponent, resolve: {post: PostResolver} },
  { path: 'registro', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }