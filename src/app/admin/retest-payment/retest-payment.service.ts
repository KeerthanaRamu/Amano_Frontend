import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RetestPaymentService {

  constructor(private http: HttpClient) {
   
  }

  getRetestList() {
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getRetestList`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
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

  
  getRetestDetails() {
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getRetestDetails`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  
  checkRetestExists(retest_status,license_type){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/checkRetestExists`,{retest_status,license_type})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  setRetestPayment(retestData,license_type){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/setRetestPayment`,{retestData,license_type})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  updateRetestPayment(retestData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/updateRetestPayment`,{retestData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  deleteRetestPayment(retestData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/deleteRetestPayment`,{retestData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

 

}
