import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-streampopup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  teacherform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    firstName: this.builder.control('', Validators.required),
    middleName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required),
    phoneNumber: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
    roleType: this.builder.control('', Validators.required),
    email: ['',[Validators.required, Validators.email]],
    address: this.builder.control('', Validators.required)
  });

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetTeacherById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.teacherform.setValue({
          id: this.editdata.id,
          firstName: this.editdata.firstName,
          middleName: this.editdata.middleName,
          lastName: this.editdata.lastName,
          gender: this.editdata.gender,
          email: this.editdata.email,
          phoneNumber: this.editdata.phoneNumber,
          address: this.editdata.address,
          roleType: this.editdata.roleType
        });
      });
    }
  }

  SaveTeacher() {
    if (this.teacherform.valid) {
      const Editid = this.teacherform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateTeacher(Editid, this.teacherform.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success('Teacher Details Updated Successfully.');
        });
      } else {
        this.api.AddTeacher(this.teacherform.value).subscribe(response => {
          this.closepopup();
          alertify.success('Teacher Added Successfully.');
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
