import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomgojsComponent } from './customgojs.component';

describe('CustomgojsComponent', () => {
  let component: CustomgojsComponent;
  let fixture: ComponentFixture<CustomgojsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomgojsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomgojsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
