import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule } from '@angular/material';
import { SidenavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './tool-bar/tool-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule,
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
