import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './timeslotpopup.component.html',
  styleUrls: ['./timeslotpopup.component.css']
})
export class TimeslotpopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetTimeslotById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.timeslotform.patchValue({
          id:this.editdata.id, 
          day:this.editdata.day, 
          startTime:this.editdata.startTime,
          endTime:this.editdata.endTime
        });
      });
    }
  }

  timeslotform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    day: this.builder.control('', Validators.required),
    startTime: this.builder.control('', Validators.required),
    endTime: this.builder.control('', Validators.required)
  });

  SaveTimeslot() {
    if (this.timeslotform.valid) {
      const Editid = this.timeslotform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateTimeslot(Editid, this.timeslotform.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success("Timeslot Updated Successfully.")
        });
      } else {
        this.api.AddTimeslot(this.timeslotform.value).subscribe(response => {
          this.closepopup();
          alertify.success("Timeslot Added Successfully.")
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}
