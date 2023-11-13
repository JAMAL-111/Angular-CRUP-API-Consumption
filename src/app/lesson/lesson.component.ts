import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lesson } from '../Model/Lesson';
import { LessonpopupComponent } from '../lessonpopup/lessonpopup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  lessondata!: Lesson[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadLesson();
  }

  displayColums: string[] = ["id", "teacherName", "subjectName", "streamName", "hoursPerWeek", "action"]

  Openlessonpopup(id: any) {
    const _popup = this.dialog.open(LessonpopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadLesson();
    });
  }

  LoadLesson() {
    this.api.GetAllLessons().subscribe(response => {
      //this.lessondata = response;
      this.lessondata = response.data;
      this.finaldata=new MatTableDataSource<Lesson>(this.lessondata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  Filterchange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.finaldata.filter = value;
  }

  EditLesson(id: any) {
    this.Openlessonpopup(id);
  }
  DeleteLesson(id: any) {
    alertify.confirm("Delete Lesson", "Are You Sure You Want To Delete This Lesson?", () => {
      this.api.DeleteLessonById(id).subscribe(r => {
        this.LoadLesson();
      });
    }, function () {

    })
  }
}
