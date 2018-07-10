import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'

// Components
import { EditPostComponent } from './edit-post.component';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    EditPostComponent
  ],
  exports: [
    EditPostComponent
  ]
})
export class EditPostModule {}