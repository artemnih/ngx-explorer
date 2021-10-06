import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSwitcherComponent } from './view-switcher.component.ts';

describe('ViewSwitcherComponent', () => {
  let component: ViewSwitcherComponent;
  let fixture: ComponentFixture<ViewSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
