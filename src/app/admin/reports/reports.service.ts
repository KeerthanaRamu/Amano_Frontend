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

  

  getRegistrationReportForAdmin(dateObj){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getRegistrationReportForAdmin`,{dateObj})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRevenueReportForAdmin(dateObj){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getRevenueReportForAdmin`,{dateObj})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
