import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';

import { HomePageComponent } from './home-page/home-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { CustomgojsComponent } from '../ui/customgojs/customgojs.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    HomePageComponent,
    SecondPageComponent,
    CustomgojsComponent
  ],
  exports: [
    HomePageComponent,
    SecondPageComponent,
    CustomgojsComponent
  ],
})
export class PagesModule { }
