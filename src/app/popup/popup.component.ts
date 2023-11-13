import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetTeacherById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.teacherform.patchValue({
          id:this.editdata.id, 
          firstName:this.editdata.firstName, 
          middleName:this.editdata.middleName,
          lastName:this.editdata.lastName, 
          gender:this.editdata.gender, 
          email:this.editdata.email, 
          phoneNumber:this.editdata.phoneNumber, 
          address: this.editdata.address,
          roleType: this.editdata.roleType,
          dateOfBirth: this.editdata.dateOfBirth
        });
      });
    }
  }

  teacherform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    firstName: this.builder.control('', Validators.required),
    middleName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phoneNumber: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    roleType: this.builder.control('', Validators.required),
    dateOfBirth: this.builder.control('', Validators.required)
  });

  SaveTeacher() {
    if (this.teacherform.valid) {
      const Editid = this.teacherform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateTeacher(Editid, this.teacherform.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success("Teacher Details Updated Successfully.")
        });
      } else {
        this.api.AddTeacher(this.teacherform.value).subscribe(response => {
          this.closepopup();
          alertify.success("Teacher Added Successfully.")
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}
