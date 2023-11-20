import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Stream } from '../Model/Stream';
import { Chart } from 'chart.js';
import { Lesson } from '../Model/Lesson';
import { NumberOfTeachersPerClass } from '../Model/NumberOfTeachersPerClass';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teacherCount: number = 0;
  lessonCount: number = 0;
  timeslotCount: number = 0;
  subjectCount: number = 0;
  streamCount : number = 0;
  streamdata!: Stream[];
  teachersPerClassData: NumberOfTeachersPerClass[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardCounts();
    //this.loadStreamsData();
    this.loadTeachersPerClassData();
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

  loadStreamsData() {
    this.apiService.GetAllStreams().subscribe((data: any) => {
      this.streamdata = data.data;
    });
  }

  loadTeachersPerClassData() {
    this.apiService.GetTeachersPerClass().subscribe((data: any) => {
      this.teachersPerClassData = data;
      this.createBarGraph();
    });
  }

  createBarGraph() {
    const ctx = document.getElementById('teachersPerClassChart') as HTMLCanvasElement;
    const teachersPerClassChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.teachersPerClassData.map(item => item.class),
        datasets: [{
          label: 'Number of Teachers',
          data: this.teachersPerClassData.map(item => item.numberOfTeachers),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
