import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import {RouterOutlet} from "@angular/router";
import {RoutingModule} from "./routing/routing.module";
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@microsoft/signalr";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent
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

