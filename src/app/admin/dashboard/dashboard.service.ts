import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class DashboardService {


  constructor(private http: HttpClient) {
   
  }

  
  getDashboardCount(){
    return this.http
    .get<any>(`${environment.apiUrl}/login/getDashboardCount`,{withCredentials: true})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getDashboardRegistrationReport(){
    return this.http
    .get<any>(`${environment.apiUrl}/login/getDashboardRegistrationReport`,{withCredentials: true})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getDashboardSalesReport(){
    return this.http
    .get<any>(`${environment.apiUrl}/login/getDashboardSalesReport`,{withCredentials: true})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getStudentMonthlyReport(){
    return this.http
    .get<any>(`${environment.apiUrl}/login/getStudentMonthlyReport`,{withCredentials: true})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getSalesMonthlyReport(){
    return this.http
    .get<any>(`${environment.apiUrl}/login/getSalesMonthlyReport`,{withCredentials: true})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

 
}
