import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import {Observable} from "rxjs";

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
    ): boolean{
        console.log(!!this.userService.getUser().token);
        return !!this.userService.getUser().token;
    }
}
