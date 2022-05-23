import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TimeMasterService {

  constructor(private http: HttpClient) {
   
  }

  
  setTimeDetails(timeData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/setTimeDetails`,{timeData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  getTimeDetails(){
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getTimeDetails`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  updateTimeDetails(timeData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/updateTimeDetails`,{timeData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }
 
 

}
