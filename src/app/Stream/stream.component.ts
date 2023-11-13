import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Stream } from '../Model/Stream';
import { StreampopupComponent } from '../streampopup/streampopup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  streamdata!: Stream[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadStream();
  }

  displayColums: string[] = ["id", "name", "class_teacher_id", "action"]

  Openstreampopup(id: any) {
    const _popup = this.dialog.open(StreampopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadStream();
    });
  }

  LoadStream() {
    this.api.GetAllStreams().subscribe(response => {
      //this.streamdata = response;
      this.streamdata = response.data;
      this.finaldata=new MatTableDataSource<Stream>(this.streamdata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  Filterchange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.finaldata.filter = value;
  }

  EditTeacher(id: any) {
    this.Openstreampopup(id);
  }
  DeleteTeacher(id: any) {
    alertify.confirm("Delete Stream", "Are You Sure You Want To Delete This Stream?", () => {
      this.api.DeleteTeacherById(id).subscribe(r => {
        this.LoadStream();
      });
    }, function () {

    })


  }

}
