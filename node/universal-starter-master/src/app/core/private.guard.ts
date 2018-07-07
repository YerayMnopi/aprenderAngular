import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import {Observable} from "rxjs/Observable";

/* Services */
import { UserService } from './user.service';

/* Models */
import { Post } from "../shared/models/posts";

@Injectable()
export class PrivateGuard implements CanActivate {

    constructor(private userService: UserService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>{
        return this.userService.verify();
    }
}
