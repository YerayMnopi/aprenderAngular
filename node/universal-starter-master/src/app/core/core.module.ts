import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Services */
import { ApiService } from './api.service';
import { PostsService } from './posts.service';
import { PostResolver } from './post.resolve';

@NgModule({
  providers: [
    HttpClient,
    ApiService,
    PostsService,
    PostResolver
  ]
})
export class CoreModule { }
