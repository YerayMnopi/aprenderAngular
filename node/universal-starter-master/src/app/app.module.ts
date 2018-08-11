import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';

import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { PublicModule } from "./public/public.module";
import { PrivateModule } from "./private/private.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserTransferStateModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PublicModule,
    SharedModule,
    PrivateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
