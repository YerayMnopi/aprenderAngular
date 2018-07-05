import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', loadChildren: './public/public.module#PublicModule'},
  // { path: 'registro', component: SignUpComponent, pathMatch: 'full'},
  { path: 'admin', loadChildren: './private/private.module#PrivateModule', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }