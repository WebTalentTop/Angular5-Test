import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material';
@Component({
  selector: 'toolbar-dialog',
  templateUrl: './toolbar-dialog.component.html',
  styleUrls: ['./toolbar-dialog.component.css']
})
export class ToolbarDialog {
  constructor(public dialogRef: MatDialogRef<ToolbarDialog>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
