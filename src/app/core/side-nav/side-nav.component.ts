import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToolbarComponent } from '../tool-bar/tool-bar.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToolbarDialog } from '../../ui/toolbar-dialog/toolbar-dialog.component';
import { TRIGGER_SIDEBAR_TEXT, SidebarTextAction, AppState } from '../../reducers';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SidenavComponent {
  date$: string;
  selectedNode$: string;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private store: Store<AppState>) {
    this.store.select('toolbar').subscribe( data => this.date$ = (data as any).payload );
    this.store.select('diagram').subscribe( data => this.selectedNode$ = (data as any).payload );
  }
  openDialog() {
    const dialogRef = this.dialog.open(ToolbarDialog, {
      width: '250px',
      height: '150px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
  }
  triggerText($event) {
    this.store.dispatch({ type: TRIGGER_SIDEBAR_TEXT, payload: new SidebarTextAction($event.target.value) });
  }
}
