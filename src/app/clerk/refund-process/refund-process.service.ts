import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RefundProcessService {


  constructor(private http: HttpClient) {
   
  }


  getNRICNumberToApplyRefund(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getNRICNumberToApplyRefund`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPassportNumberToApplyRefund(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPassportNumberToApplyRefund`)
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

  getRefundDetailsForStudents(enrolldata){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getRefundDetailsForStudents`,{enrolldata})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  setRefundConfirmation(enrolldata,refundAmount,remarks){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setRefundConfirmation`,{enrolldata,refundAmount,remarks})
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

}
