import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ReportsService {


  constructor(private http: HttpClient) {
   
  }


  getPendingScheduleStatus(){
    return this.http
    .get<any>(`${environment.apiUrl}/report/getPendingScheduleStatus`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPendingScheduleDetails(status){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getPendingScheduleDetails`,{status})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getNRICNumberForPendingReport(){
    return this.http
    .get<any>(`${environment.apiUrl}/report/getNRICNumberForPendingReport`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPassportNumberForPendingReport(){
    return this.http
    .get<any>(`${environment.apiUrl}/report/getPassportNumberForPendingReport`)
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


  getCurrentDaySalesReport(){
    return this.http
    .get<any>(`${environment.apiUrl}/report/getCurrentDaySalesReport`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPendingReport(pendingFormValue,studentId){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getPendingReport`,{pendingFormValue,studentId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getStudentLicenseDetails(studData){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getStudentLicenseDetails`,{studData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  setPendingPaymentDetails(studData,payment_type,reference_no,payamount){
    return this.http
    .post<any>(`${environment.apiUrl}/report/setPendingPaymentDetails`,{studData,payment_type,reference_no,payamount})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteStudentDetails(rowToBeDeleted){
    return this.http
    .post<any>(`${environment.apiUrl}/report/deleteStudentDetails`,{rowToBeDeleted})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
