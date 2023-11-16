import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from '../Model/Teacher';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  teacherdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,) {
    this.teacherdata = data;
  }


  getObjectKeys(obj: Teacher){
    return JSON.stringify(Object);
  }
  ngOnInit(): void {

  }

  closepopup() {
    this.dialog.closeAll();
  }
}
