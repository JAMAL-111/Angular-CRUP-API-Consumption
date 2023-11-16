import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Teacher } from '../Model/Teacher';
import { Stream } from '../Model/Stream';
import { Subject } from '../Model/Subject';
import { Timeslot } from '../Model/Timeslot';
import { Lesson } from '../Model/Lesson';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/teachers';
  streamurl = 'http://localhost:3000/streams';
  subjecturl = 'http://localhost:3000/subjects';
  timesloturl = 'http://localhost:3000/timeslot';
  lessonurl = 'http://localhost:3000/lessons';

  // GetAllTeachers(): Observable<Teacher[]> {
  //   return this.http.get<Teacher[]>(this.apiurl);
  // }

  //TEACHER APIs
  GetAllTeachers(){
    return this.http.post<{status:String,data:Teacher[]}>("http://localhost:8081/api/v1/",
   {
     action: 'all-teacher',
   }
   );
 }

  GetTeacherById(id: any): Observable<Teacher> {
    return this.http.post<Teacher>("http://localhost:8081/api/v1/",
    {
      action: "get-teacher",
      data: {
        id: id
      }
    });
  }

  // GetTeacherById(id: any): Observable<Teacher> {
  //   return this.http.get<Teacher>(this.apiurl + '/' + id);
  // }

  // DeleteTeacherById(id: any) {
  //   return this.http.delete(this.apiurl + '/' + id);
  // }

  DeleteTeacherById(id: {id:any}) {
    return this.http.post("http://localhost:8081/api/v1/",
      {
        action: "delete-teacher",
        data: {
          id: id
        }
      });
  }

  // AddTeacher(teacherdata: any) {
  //   return this.http.post(this.apiurl, teacherdata);
  // }

  AddTeacher(teacherdata: any){
    return this.http.post<any>("http://localhost:8081/api/v1/",
    {
      action:"add-teacher",
      data: teacherdata
    })
  }

  // UpdateTeacher(id: any, teacherdata: any) {
  //   return this.http.put(this.apiurl + '/' + id, teacherdata);
  // }

  UpdateTeacher(id: any, teacherdata: any) {
    return this.http.post<any>("http://localhost:8081/api/v1/",
    {
      action:"update-teacher",
      data: teacherdata
    })
  }

  // Add this method to fetch teacher details by ID
  getTeacherDetails(id: any): Observable<Teacher> {
    return this.http.post<Teacher>("http://localhost:8081/api/v1/",
      {
        action: "get-teacher",
        data: {
          id: id
        }
      }
    );
  }


  //STREAM APIs
  GetAllStreams(){
    return this.http.post<{status:String,data:Stream[]}>("http://localhost:8081/api/v1/",
  {
    action: 'all-streams',
  }
  );
  }

  // GetAllStreams(): Observable<Stream[]> {
  //   return this.http.get<Stream[]>(this.streamurl);
  // }

  GetStreamById(id: any): Observable<Stream> {
    return this.http.get<Stream>(this.streamurl + '/' + id);
  }

  // DeleteStreamById(id: any) {
  //   return this.http.delete(this.streamurl + '/' + id);
  // }

  DeleteStreamById(id: any) {
    return this.http.post("http://localhost:8081/api/v1/",
    {
      action: "delete-stream",
      data: {
        id: id
      }
    });
  }


  AddStream(streamdata: any){
    return this.http.post<any>("http://localhost:8081/api/v1/",
    {
      action:"add-stream",
      data: streamdata
    })
  }

  // AddStream(streamdata: any) {
  //   return this.http.post(this.streamurl, streamdata);
  // }

  // UpdateStream(id: any, streamdata: any) {
  //   return this.http.put(this.streamurl + '/' + id, streamdata);
  // }

  UpdateStream(id:any, streamdata: any){
    return this.http.post("http://localhost:8081/api/v1/",
    {
      action: "update-stream",
      data: streamdata
    })
  }

  //SUBJECT APIs
  GetAllSubjects(){
    return this.http.post<{status:String,data:Subject[]}>("http://localhost:8081/api/v1/",
   {
     action: 'all-subjects',
   }
   );
  }

  // GetAllSubjects(): Observable<Subject[]> {
  //   return this.http.get<Subject[]>(this.subjecturl);
  // }

  GetSubjectById(id: any): Observable<Subject> {
    return this.http.get<Subject>(this.subjecturl + '/' + id);
  }

  DeleteSubjectById(id: any) {
    return this.http.delete(this.subjecturl + '/' + id);
  }

  // AddSubject(subjectdata: any) {
  //   return this.http.post(this.streamurl, subjectdata);
  // }


  AddSubject(timeslotdata: any){
    return this.http.post<any>("http://localhost:8081/api/v1/",
    {
      action:"add-subject",
      data: timeslotdata
    })
  }

  // UpdateSubject(id: any, subjectdata: any) {
  //   return this.http.put(this.subjecturl + '/' + id, subjectdata);
  // }

  UpdateSubject(id:any, subjectdata: any){
    return this.http.post("http://localhost:8081/api/v1/",
    {
      action: "update-subject",
      data: subjectdata
    })
  }

  //TIMESLOT APIs
  GetAllTimeslot(){
    return this.http.post<{status:String,data:Timeslot[]}>("http://localhost:8081/api/v1/",
   {
     action: 'all-timeslot',
   }
   );
  }

  GetTimeslotById(id: any): Observable<Teacher> {
    return this.http.get<Teacher>(this.timesloturl + '/' + id);
  }

  DeleteTimeslotById(id: any) {
    return this.http.delete(this.timesloturl + '/' + id);
  }

  // AddTeacher(teacherdata: any) {
  //   return this.http.post(this.apiurl, teacherdata);
  // }

  AddTimeslot(timeslotdata: any){
    return this.http.post<any>("http://localhost:8081/api/v1/",
    {
      action:"add-timeslot",
      data: timeslotdata
    })
  }

  //LESSON APIs
  GetAllLessons(){
    return this.http.post<{status:String,data:Lesson[]}>("http://localhost:8081/api/v1/",
   {
     action: 'all-lessons',
   }
   );
  }

  GetLessonById(id: any): Observable<Lesson> {
    return this.http.get<Lesson>(this.lessonurl + '/' + id);
  }

  DeleteLessonById(id: {"teacherId":number, "streamId":number, "subjectId":number}) {
    return this.http.post("http://localhost:8081/api/v1/",
      {
        action: "delete-lesson",
        data: id
      });
  }

  // AddTeacher(teacherdata: any) {
  //   return this.http.post(this.apiurl, teacherdata);
  // }

  AddLesson(lessondata: any){
    return this.http.post<any>("http://localhost:8081/api/v1/",
    {
      action:"add-lesson",
      data: lessondata,
    })
  }

  UpdateLesson(id: any, lessondata: any) {
    return this.http.put(this.lessonurl + '/' + id, lessondata);
  }

}


