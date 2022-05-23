import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  constructor(private http: HttpClient) {
   
  }

  getStatusListPerRole(custData){
    return this.http
    .post<any>(`${environment.apiUrl}/instructor/getStatusListPerRole`,{custData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  getStudentListPerInstructor(){
    return this.http
    .get<any>(`${environment.apiUrl}/instructor/getStudentListPerInstructor`)
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }


  getParticularStudentDetails(studentId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getParticularStudentDetails`,{studentId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  updateStudentStatusInfo(studentInfo,statusdt){
    return this.http
    .post<any>(`${environment.apiUrl}/instructor/updateStudentStatusInfo`,{studentInfo,statusdt})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  checkScheduleCompleted(studData,status_id){
    return this.http
    .post<any>(`${environment.apiUrl}/instructor/checkScheduleCompleted`,{studData,status_id})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
