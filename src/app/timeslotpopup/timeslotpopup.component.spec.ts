import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotpopupComponent } from './timeslotpopup.component';

describe('TimeslotpopupComponent', () => {
  let component: TimeslotpopupComponent;
  let fixture: ComponentFixture<TimeslotpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeslotpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
