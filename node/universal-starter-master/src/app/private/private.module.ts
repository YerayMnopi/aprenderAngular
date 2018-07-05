import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { PrivateRoutingModule } from './private-routing.module';
import { FormsModule } from '@angular/forms';

// Components
import { EditPostComponent } from './edit-post/edit-post.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  imports: [
    SharedModule,
    PrivateRoutingModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    EditPostComponent
  ]
})
export class PrivateModule {}