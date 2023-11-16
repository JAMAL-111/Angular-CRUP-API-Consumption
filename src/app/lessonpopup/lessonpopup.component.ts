import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-lessonpopup',
  templateUrl: './lessonpopup.component.html',
  styleUrls: ['./lessonpopup.component.css']
})
export class LessonpopupComponent implements OnInit {
  streamdata:any[]=[];
  subjectdata:any[]=[];
  teacherdata:any[]=[];
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.subjectdata=data;
    }

  ngOnInit(): void {
    this.fetchStreams();
    this.fetchSubjects();
    this.fetchTeachers();
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetTeacherById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.lessonform.patchValue({
          id:this.editdata.id, 
          teacherId:this.editdata.teacherId, 
          subjectId:this.editdata.subjectId,
          streamId:this.editdata.streamId,
          hoursPerWeek:this.editdata.hoursPerWeek
        });
      });
    }
  }

  // Utility function to convert object data to array
  private convertObjectToArray(data: any): any[] {
    if (data && typeof data === 'object') {
      return Object.values(data); // Extract values into an array
    }
    return [];
  }

  fetchSubjects() {
    this.api.GetAllSubjects().subscribe((response: any) => {
      // Check the structure of the API response and adjust if needed
      // this.subjectdata = response.data || []; // Assign response.data or an empty array if data is null or undefined
      this.subjectdata = this.convertObjectToArray(response.data);
    });
  }

  fetchStreams() {
    this.api.GetAllStreams().subscribe((response: any) => {
      // Check the structure of the API response and adjust if needed
      this.streamdata = this.convertObjectToArray(response.data);
    });
  }

  fetchTeachers() {
    this.api.GetAllTeachers().subscribe((response: any) => {
      // Check the structure of the API response and adjust if needed
      this.teacherdata = this.convertObjectToArray(response.data);
    });
  }

  lessonform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    teacherId: this.builder.control('', Validators.required),
    subjectId: this.builder.control('', Validators.required),
    streamId: this.builder.control('', Validators.required),
    hoursPerWeek: this.builder.control('', Validators.required)
  });

  SaveLesson() {
    if (this.lessonform.valid) {
      const Editid = this.lessonform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateLesson(Editid, this.lessonform.getRawValue()).subscribe(response => {
          this.closelessonpopup();
          alertify.success("Lesson Updated Successfully.")
        });
      } else {
        this.api.AddLesson(this.lessonform.value).subscribe(response => {
          this.closelessonpopup();
          alertify.success("Lesson Added Successfully.")
        });
      }
    }
  }

  closelessonpopup() {
    this.dialog.closeAll();
  }

}
