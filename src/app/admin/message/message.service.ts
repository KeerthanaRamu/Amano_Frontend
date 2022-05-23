import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(private http: HttpClient) {
   
  }

  getMessageList() {
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getMessageList`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  
  getMessageDetails() {
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getMessageDetails`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  
  checkMessagetExists(msg_status){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/checkMessagetExists`,{msg_status})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  setMessageDetails(msgData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/setMessageDetails`,{msgData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  updateMessageDetails(msgData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/updateMessageDetails`,{msgData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

  deleteMessageDetails(msgData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/deleteMessageDetails`,{msgData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentEmployee', JSON.stringify(user));
          // this.currentEmployeeSubject.next(user);
          return res;
        })
      );
  }

 

}
