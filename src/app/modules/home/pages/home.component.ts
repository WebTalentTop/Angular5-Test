import {Component, OnInit} from '@angular/core';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public ngOnInit() {
    console.log('`Home` component');
  }
}
