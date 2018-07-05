import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import {Observable} from "rxjs";

/* Services */
import { PostsService } from '../../core/posts.service';

/* Models */
import { Post } from "../../shared/models/posts";

@Injectable()
export class PostResolver implements Resolve<Post> {

    constructor(private postsService: PostsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.postsService.getPost(route.params.slug);
    }
}
