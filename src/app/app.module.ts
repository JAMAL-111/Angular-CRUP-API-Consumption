import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/MaterialModule';
import { TeacherComponent } from './Teacher/teacher.component';
import { PopupComponent } from './popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenubarComponent } from './menubar/menubar.component';
import { DatePipe } from '@angular/common';
import { StreampopupComponent } from './streampopup/streampopup.component';
import { StreamComponent } from './Stream/stream.component';
import { SubjectpopupComponent } from './subjectpopup/subjectpopup.component';
import { SubjectComponent } from './Subject/subject.component';
import { TimeslotComponent } from './Timeslot/timeslot.component';
import { TimeslotpopupComponent } from './timeslotpopup/timeslotpopup.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonpopupComponent } from './lessonpopup/lessonpopup.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    PopupComponent,
    DashboardComponent,
    MenubarComponent,
    StreampopupComponent,
    StreamComponent,
    SubjectpopupComponent,
    SubjectComponent,
    TimeslotComponent,
    TimeslotpopupComponent,
    LessonComponent,
    LessonpopupComponent,
    TeacherDetailsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatePipe,
    MatAutocompleteModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
