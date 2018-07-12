import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Services */
import { ApiService } from './api.service';
import { PostsService } from './posts.service';
import { UserService } from './user.service';

import { PostResolver } from './post.resolve';

import { PrivateGuard } from './private.guard';


@NgModule({
  providers: [
    HttpClient,
    ApiService,
    PostsService,
    UserService,
    PostResolver,
    PrivateGuard,
    { provide: 'WINDOWREF', useFactory: getWindowRef },
  ]
})
export class CoreModule { }

export function getWindowRef() {
  return (typeof window !== "undefined") ? window : null;
}