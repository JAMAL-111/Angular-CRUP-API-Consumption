import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Teacher } from '../Model/Teacher';
import { Stream } from '../Model/Stream';
import { Subject } from '../Model/Subject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/teachers';
  streamurl = 'http://localhost:3000/streams';
  subjecturl = 'http://localhost:3000/subjects';

  GetAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiurl);
  }

//   GetAllTeachers(){
//     return this.http.post<{status:String,data:Teacher[]}>("http://localhost:8081/api/v1/",
//    {
//      action: 'all-teacher',
//    }
//    );
//  }

  GetTeacherById(id: any): Observable<Teacher> {
    return this.http.get<Teacher>(this.apiurl + '/' + id);
  }

  DeleteTeacherById(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  AddTeacher(teacherdata: any) {
    return this.http.post(this.apiurl, teacherdata);
  }

  // AddTeacher(teacherdata: any){
  //   return this.http.post<any>("http://localhost:8081/api/v1/",
  //   {
  //     action:"add-teacher",
  //     data: teacherdata
  //   })
  // }

  UpdateTeacher(id: any, teacherdata: any) {
    return this.http.put(this.apiurl + '/' + id, teacherdata);
  }


//stream apis
  GetAllStreams(): Observable<Stream[]> {
    return this.http.get<Stream[]>(this.streamurl);
  }

  GetStreamById(id: any): Observable<Stream> {
    return this.http.get<Stream>(this.streamurl + '/' + id);
  }

  DeleteStreamById(id: any) {
    return this.http.delete(this.streamurl + '/' + id);
  }

  AddStream(streamdata: any) {
    return this.http.post(this.streamurl, streamdata);
  }

  UpdateStream(id: any, streamdata: any) {
    return this.http.put(this.streamurl + '/' + id, streamdata);
  }

  //subject apis
  GetAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjecturl);
  }

  GetSubjectById(id: any): Observable<Subject> {
    return this.http.get<Subject>(this.subjecturl + '/' + id);
  }

  DeleteSubjectById(id: any) {
    return this.http.delete(this.subjecturl + '/' + id);
  }

  AddSubject(subjectdata: any) {
    return this.http.post(this.streamurl, subjectdata);
  }

  UpdateSubject(id: any, subjectdata: any) {
    return this.http.put(this.subjecturl + '/' + id, subjectdata);
  }

}
