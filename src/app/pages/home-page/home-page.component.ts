import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/name';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  name$: string;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('name').subscribe( data => this.name$ = (data as any).payload );
  }

}
