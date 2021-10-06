import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondMenuBarComponent } from './second-menu-bar.component';

describe('SecondMenuBarComponent', () => {
  let component: SecondMenuBarComponent;
  let fixture: ComponentFixture<SecondMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
