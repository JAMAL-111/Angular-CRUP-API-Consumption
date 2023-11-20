import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  teacherCount: number = 0;
  lessonCount: number = 0;
  timeslotCount: number = 0;
  subjectCount: number = 0;
  streamCount : number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardCounts();
  }

  loadDashboardCounts() {
    this.apiService.GetAllTeachers().subscribe((data: any) => {
      this.teacherCount = data.data.length;
    });

    this.apiService.GetAllLessons().subscribe((data: any) => {
      this.lessonCount = data.data.length; 
    });

    this.apiService.GetAllTimeslot().subscribe((data: any) => {
      this.timeslotCount = data.data.length; 
    });

    this.apiService.GetAllSubjects().subscribe((data: any) => {
      this.subjectCount = data.data.length; 
    });

    this.apiService.GetAllStreams().subscribe((data: any) => {
      this.streamCount = data.data.length; 
    });
  }
}
