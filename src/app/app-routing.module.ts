import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './Teacher/teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StreamComponent } from './Stream/stream.component';
import { SubjectComponent } from './Subject/subject.component';
import { LessonComponent } from './lesson/lesson.component';
import { TimeslotComponent } from './Timeslot/timeslot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenubarComponent } from './menubar/menubar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', title: 'TGS | Login', component: LoginComponent },
  { path: 'register', title: 'TGS | Register', component: RegisterComponent },
  {
    path: 'main', component: MenubarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'teacher', title: 'TGS | Teachers', component: TeacherComponent },
      { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
      { path: 'subject', title: 'TGS | Subjects', component: SubjectComponent },
      { path: 'lesson', title: 'TGS | Lessons', component: LessonComponent },
      { path: 'timeslot', title: 'TGS | Timeslots', component: TimeslotComponent },
      { path: 'stream', title: 'TGS | Streams', component: StreamComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
