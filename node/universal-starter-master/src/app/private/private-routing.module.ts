import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: EditPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }