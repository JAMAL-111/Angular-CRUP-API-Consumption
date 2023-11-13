import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonpopupComponent } from './lessonpopup.component';

describe('LessonpopupComponent', () => {
  let component: LessonpopupComponent;
  let fixture: ComponentFixture<LessonpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonpopupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
