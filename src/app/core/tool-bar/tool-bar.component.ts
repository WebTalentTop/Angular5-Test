import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToolbarDialog } from '../../ui/toolbar-dialog/toolbar-dialog.component';
import { TRIGGER_TOOLBAR_TEXT, ToolbarTextAction, AppState } from '../../reducers';
@Component({
  selector: 'tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolbarComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private store: Store<AppState>) {}
  openDialog() {
    const dialogRef = this.dialog.open(ToolbarDialog, {
      width: '250px',
      height: '150px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
  }
  triggerDate() {
    const date = new Date().toLocaleTimeString();
    this.store.dispatch({ type: TRIGGER_TOOLBAR_TEXT, payload: new ToolbarTextAction(date.toString()) });
  }
}
