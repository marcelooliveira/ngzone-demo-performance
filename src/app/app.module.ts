import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgZoneDemo } from './ng-zone.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, NgZoneDemo ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
