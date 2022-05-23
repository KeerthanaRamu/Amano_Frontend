import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  packageInfo: any;


  constructor(private http: HttpClient) {
   
  }

  setPackageInfoToEdit(licenseinfo){
    this.packageInfo=licenseinfo;
  }


 getPackageInfoToEdit(){
    return this.packageInfo;
  }


  getNRICNumberForInsTimeline(){
    return this.http
    .get<any>(`${environment.apiUrl}/instructor/getNRICNumberForInsTimeline`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPassportNumberForInsTimeline(){
    return this.http
    .get<any>(`${environment.apiUrl}/instructor/getPassportNumberForInsTimeline`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getEnrollmentNumberList(studentdt){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getEnrollmentNumberList`,{studentdt})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLicenseListPerEnroll(studentId,enrollId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getLicenseListPerEnroll`,{studentId,enrollId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
  
  getStatusListForTimeLine(enrollvalue){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getStatusListForTimeLine`,{enrollvalue})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
  viewInstructorDetails(enrollData, statusid) {
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/viewInstructorDetails`,{ enrollData, statusid })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  checkTimelineForStudent(studentdt){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkTimelineForStudent`,{studentdt})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getStatusListForStudent(enrollValue){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getStatusListForStudent`,{enrollValue})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getStatusListForStudentOfGDL(enrollValue){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getStatusListForStudentOfGDL`,{enrollValue})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateStudentStatusInfo(enrollValue,statusdt){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/updateStudentStatusInfo`,{enrollValue,statusdt})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getStudPackageInfo(enrollValue){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getStudPackageInfo`,{enrollValue})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getTimeDetails(){
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getTimeDetails`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

}
