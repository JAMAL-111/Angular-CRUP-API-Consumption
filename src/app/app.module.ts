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
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatePipe

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
