import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';


// To fetch data with our API we need the HTTP Module!

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent
],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
