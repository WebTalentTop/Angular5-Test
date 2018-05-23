import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SidenavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './tool-bar/tool-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    SidenavComponent,
    ToolbarComponent,
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent,
  ],
})
export class CoreModule { }
