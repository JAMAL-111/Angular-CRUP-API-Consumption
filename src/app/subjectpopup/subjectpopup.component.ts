import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-subjectpopup',
  templateUrl: './subjectpopup.component.html',
  styleUrls: ['./subjectpopup.component.css']
})
export class SubjectpopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetSubjectById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.subjectform.patchValue({
          id:this.editdata.id, 
          name:this.editdata.name, 
          description:this.editdata.description
        });
      });
    }
  }

  subjectform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  });

  SaveSubject() {
    if (this.subjectform.valid) {
      const Editid = this.subjectform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateSubject(Editid, this.subjectform.getRawValue()).subscribe(response => {
          this.closesubjectpopup();
          alertify.success("Subject Details Updated Successfully.")
        });
      } else {
        this.api.AddSubject(this.subjectform.value).subscribe(response => {
          this.closesubjectpopup();
          alertify.success("Subject Added Successfully.")
        });
      }
    }
  }

  closesubjectpopup() {
    this.dialog.closeAll();
  }

}
