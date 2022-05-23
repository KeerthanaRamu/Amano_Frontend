import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RefundService {

  constructor(private http: HttpClient) {
   
  }

  getRefundList() {
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getRefundList`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getLicenseClassList() {
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getLicenseClassList`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }


  
  getRefundDetails() {
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getRefundDetails`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  
  checkRefundExists(refundData,license_type){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/checkRefundExists`,{refundData,license_type})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  setRefundDetails(refundData,license_type){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/setRefundDetails`,{refundData,license_type})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateRefundDetails(refundData,license_type){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/updateRefundDetails`,{refundData,license_type})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteRefund(refundData,license_type){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/deleteRefund`,{refundData,license_type})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

 

}
