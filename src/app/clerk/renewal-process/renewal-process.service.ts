import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RenewalProcessService {
   

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

  getAutoReceiptNumber(){
    return this.http
    .get<any>(`${environment.apiUrl}/applyLicense/getAutoReceiptNumber`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkForRenewalProcess(enrolldata){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkForRenewalProcess`,{enrolldata})
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


  setRenewalDetails(renewalDetails,payment_type,reference_no){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setRenewalDetails`,{renewalDetails,payment_type,reference_no})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
  


}
