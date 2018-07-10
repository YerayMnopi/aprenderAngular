import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { PrivateRoutingModule } from './private-routing.module';

// Components
import { EditPostModule } from './edit-post/edit-post.module';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  imports: [
    SharedModule,
    PrivateRoutingModule,
    RouterModule,
    EditPostModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class PrivateModule {}