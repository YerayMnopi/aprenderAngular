import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Services */
import { ApiService } from './api.service';
import { PostsService } from './posts.service';

@NgModule({
  providers: [
    HttpClient,
    ApiService,
    PostsService
  ]
})
export class CoreModule { }
