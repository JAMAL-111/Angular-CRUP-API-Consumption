import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectComponent } from './subject.component';

describe('TeacherComponent', () => {
  let component: SubjectComponent;
  let fixture: ComponentFixture<SubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
