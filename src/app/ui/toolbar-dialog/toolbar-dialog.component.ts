import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material';
// import { DialogService } from "../../services/dialog.service";
@Component({
  selector: 'toolbar-dialog',
  templateUrl: './toolbar-dialog.component.html',
  styleUrls: ['./toolbar-dialog.component.css']
})
export class ToolbarDialog  {

  dogName: string;

  constructor(public dialogRef: MatDialogRef<ToolbarDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    // this.dialogService.changeMessage(this.dogName)
  }
}
