import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-streampopup',
  templateUrl: './streampopup.component.html',
  styleUrls: ['./streampopup.component.css']
})
export class StreampopupComponent implements OnInit {
  teacherdata: any=[];
  editdata: any;

  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.fetchTeachers();


    if (this.data.id != '' && this.data.id != null) {
      this.api.GetStreamById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.streamform.setValue({
          id:this.editdata.id, 
          name:this.editdata.name, 
          class_teacher_id:this.editdata.class_teacher_id, 
          classRoom:this.editdata.class
        });
      });
    }
  }

  // Function to handle and ensure data is an array
  private handleResponseData(data: any): any {
    console.log(data)
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      return Object.values(data);

    }
  }

  fetchTeachers() {
    this.api.GetAllTeachers().subscribe((response: any) => {
      this.teacherdata = this.handleResponseData(response.data);
      //return this.teacherdata;
    });
  }

  streamform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    class_teacher_id: this.builder.control('', Validators.required),
    classRoom: this.builder.control('', Validators.required)
    // // id: [''],
    // name: ['', Validators.required],
    // class_teacher_id: ['', Validators.required],
    // class: ['', Validators.required]
  });

  SaveStream() {
    if (this.streamform.valid) {
      const Editid = this.streamform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateStream(Editid, this.streamform.getRawValue()).subscribe(response => {
          this.closestreampopup();
          alertify.success("Teacher Details Updated Successfully.")
        });
      } else {
        this.api.AddStream(this.streamform.value).subscribe(response => {
          this.closestreampopup();
          alertify.success("Stream Added Sucscessfully.")
        });
      }
    }
  }

  // SaveStream() {
  //   if (this.streamform.valid) {
  //     const streamData = this.streamform.value;
  //     if (streamData.id) {
  //       this.api.UpdateStream(streamData.id, streamData).subscribe(response => {
  //         this.closestreampopup();
  //         alertify.success('Teacher Details Updated Successfully.');
  //       });
  //     } else {
  //       this.api.AddStream(streamData).subscribe(response => {
  //         this.closestreampopup();
  //         alertify.success('Stream Added Successfully.');
  //       });
  //     }
  //   }
  // }

  closestreampopup() {
    this.dialog.closeAll();
  }

}
