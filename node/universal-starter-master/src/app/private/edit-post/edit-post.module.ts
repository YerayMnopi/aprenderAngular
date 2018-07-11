import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'

// Components
import { EditPostComponent } from './edit-post.component';

// Directives
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    EditPostComponent,
    AutofocusDirective
  ],
  exports: [
    EditPostComponent
  ]
})
export class EditPostModule {}