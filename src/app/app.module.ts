import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import {RouterOutlet} from "@angular/router";
import {RoutingModule} from "./routing/routing.module";
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@microsoft/signalr";
import { EncInfoComponent } from './components/enc-info/enc-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EncInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    RoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}

