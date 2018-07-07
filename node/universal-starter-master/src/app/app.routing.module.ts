import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateGuard } from './core/private.guard';

const routes: Routes = [
  { path: '', loadChildren: './public/public.module#PublicModule'},
  { path: 'admin', canActivate: [PrivateGuard], loadChildren: './private/private.module#PrivateModule', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }