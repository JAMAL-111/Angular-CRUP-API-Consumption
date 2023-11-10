import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreampopupComponent } from './streampopup.component';

describe('StreampopupComponent', () => {
  let component: StreampopupComponent;
  let fixture: ComponentFixture<StreampopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreampopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreampopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
