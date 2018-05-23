import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolbarDialog } from './toolbar-dialog/toolbar-dialog.component';
// import { DialogService } from "../services/dialog.service";
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    ToolbarDialog,
  ],
  exports: [
    ToolbarDialog,
  ],
  entryComponents: [ToolbarDialog],
  providers: []
})
export class UIModule { }
