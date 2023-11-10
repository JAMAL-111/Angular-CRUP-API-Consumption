import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from '../Model/Teacher';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  teacherdata!: Teacher[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadTeacher();
  }

  displayColums: string[] = ["id", "firstName", "middleName", "lastName","gender", "email", "phoneNumber", "address", "action"]

  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadTeacher();
    });
  }

  LoadTeacher() {
    this.api.GetAllTeachers().subscribe(response => {
      this.teacherdata = response;
      this.finaldata=new MatTableDataSource<Teacher>(this.teacherdata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  Filterchange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.finaldata.filter = value;
  }

  EditTeacher(id: any) {
    this.Openpopup(id);
  }
  DeleteTeacher(id: any) {
    alertify.confirm("Remove Teacher", "Are You Sure You Want To Delete This Teacher?", () => {
      this.api.DeleteTeacherById(id).subscribe(r => {
        this.LoadTeacher();
      });
    }, function () {

    })


  }

}
