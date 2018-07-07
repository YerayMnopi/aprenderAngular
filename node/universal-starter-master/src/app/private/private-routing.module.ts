import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin/admin.component';
import { EditPostComponent } from './edit-post/edit-post.component';

// Resolves
import { PostResolver } from '../core/post.resolve';

import { PrivateGuard } from '../core/private.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [PrivateGuard],
    component: AdminComponent
  },
  { path: 'editar/:slug',
    canActivate: [PrivateGuard],
    component: EditPostComponent, 
    resolve: {post: PostResolver} 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }