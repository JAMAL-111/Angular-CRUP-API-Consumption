import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Timeslot } from '../Model/Timeslot';
import { TimeslotpopupComponent } from '../timeslotpopup/timeslotpopup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  timeslotdata!: Timeslot[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadTimeslot();
  }

  displayColums: string[] = ["day", "startTime","endTime", "action"]

  Opentimeslotpopup(id: any) {
    const _popup = this.dialog.open(TimeslotpopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadTimeslot();
    });
  }

  LoadTimeslot() {
    this.api.GetAllTimeslot().subscribe(response => {
      //this.timeslotdata = response;
      this.timeslotdata = response.data;
      this.finaldata=new MatTableDataSource<Timeslot>(this.timeslotdata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  Filterchange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.finaldata.filter = value;
  }

  EditTimeslot(id: any) {
    this.Opentimeslotpopup(id);
  }
  DeleteTimeslot(id: any) {
    alertify.confirm("Delete timeslot", "Are You Sure You Want To Delete This Timeslot?", () => {
      this.api.DeleteTimeslotById(id).subscribe(r => {
        this.LoadTimeslot();
      });
    }, function () {

    })


  }

}
