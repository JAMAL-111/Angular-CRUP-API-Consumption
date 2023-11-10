import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from '../Model/Subject';
import { SubjectpopupComponent } from '../subjectpopup/subjectpopup.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  subjectdata!: Subject[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadSubject();
  }

  displayColums: string[] = ["id", "name", "description", "action"]

  Opensubjectpopup(id: any) {
    const _popup = this.dialog.open(SubjectpopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadSubject();
    });
  }

  LoadSubject() {
    this.api.GetAllSubjects().subscribe(response => {
      this.subjectdata = response;
      //this.teacherdata = response.data;
      this.finaldata=new MatTableDataSource<Subject>(this.subjectdata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  Filterchange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.finaldata.filter = value;
  }

  EditSubject(id: any) {
    this.Opensubjectpopup(id);
  }
  DeleteSubject(id: any) {
    alertify.confirm("Delete Subject", "Are You Sure You Want To Delete This Subject?", () => {
      this.api.DeleteSubjectById(id).subscribe(r => {
        this.LoadSubject();
      });
    }, function () {

    })


  }

}
