import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { HomePageComponent } from './home-page/home-page.component';
import { SecondPageComponent } from './second-page/second-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    HomePageComponent,
    SecondPageComponent,
  ],
  exports: [
    HomePageComponent,
    SecondPageComponent,
  ],
})
export class PagesModule { }
