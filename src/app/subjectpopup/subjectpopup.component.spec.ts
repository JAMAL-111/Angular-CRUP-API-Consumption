import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectpopupComponent } from './subjectpopup.component';

describe('SubjectpopupComponent', () => {
  let component: SubjectpopupComponent;
  let fixture: ComponentFixture<SubjectpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
