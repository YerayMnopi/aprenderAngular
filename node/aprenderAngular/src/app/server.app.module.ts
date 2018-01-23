import { AppModule } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [
    //Make sure the string matches
    BrowserModule.withServerTransition({
      appId: 'aprender-angular'
    }),
    ServerModule,
    AppModule,
    ServerTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ServerAppModule {}
