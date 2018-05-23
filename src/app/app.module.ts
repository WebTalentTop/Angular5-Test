import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { ToolbarDialog } from './ui/toolbar-dialog/toolbar-dialog.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    CoreModule,
    PagesModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [ToolbarDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
