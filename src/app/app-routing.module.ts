import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './Teacher/teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StreamComponent } from './Stream/stream.component';
import { SubjectComponent } from './Subject/subject.component';
import { LessonComponent } from './Lesson/lesson.component';
import { TimeslotComponent } from './Timeslot/timeslot.component';

const routes: Routes = [
  //{path:'autocomplete', component:AutocompleteComponent}
  {path:'teacher', component:TeacherComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'subject', component:SubjectComponent},
  {path:'lesson', component:LessonComponent},
  {path:'timeslot', component:TimeslotComponent},
  {path:'stream', component:StreamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
