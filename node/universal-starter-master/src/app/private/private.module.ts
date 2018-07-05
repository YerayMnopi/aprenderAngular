import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { PrivateRoutingModule } from './private-routing.module';

// Components
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  imports: [
    SharedModule,
    PrivateRoutingModule
  ],
  declarations: [
    EditPostComponent
  ]
})
export class PrivateModule {}