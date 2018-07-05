import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

// Components
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    SharedModule,
    PublicRoutingModule
  ],
  declarations: [
    HomeComponent,
    PostComponent,
  ]
})
export class PublicModule {}