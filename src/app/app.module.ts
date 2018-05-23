import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './core/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { SecondPageComponent } from './modules/second-page/second-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomePageComponent,
    SecondPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
