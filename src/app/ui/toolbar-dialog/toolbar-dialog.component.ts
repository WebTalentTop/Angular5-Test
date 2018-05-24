import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SET_NAME, NameAction, AppState } from '../../reducers/name';

import { MatDialogRef} from '@angular/material';


@Component({
  selector: 'toolbar-dialog',
  templateUrl: './toolbar-dialog.component.html',
  styleUrls: ['./toolbar-dialog.component.css']
})

export class ToolbarDialog  {

  name$: string;

  constructor(public dialogRef: MatDialogRef<ToolbarDialog>, private store: Store<AppState>) {
    this.store.select('name').subscribe( data => this.name$ = (data as any).payload );
  }
  onYesClick(): void {
    this.store.dispatch({ type: SET_NAME, payload: new NameAction(this.name$) });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
