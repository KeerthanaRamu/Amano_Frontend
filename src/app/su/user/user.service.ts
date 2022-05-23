import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
   
  }

  getClientList() {
    return this.http
      .get<any>(`${environment.apiUrl}/superAdmin/getClientList`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }

  getUserList() {
    return this.http
      .get<any>(`${environment.apiUrl}/superAdmin/getUserList`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }


  setUserDetails(formData){
    return this.http
      .post<any>(`${environment.apiUrl}/superAdmin/setEmployeeDetails`,formData)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }

  updateUserDetails(formData){
    return this.http
      .post<any>(`${environment.apiUrl}/superAdmin/updateUserDetails`,formData)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }

  deleteUserDetails(userData){
    return this.http
      .post<any>(`${environment.apiUrl}/superAdmin/deleteUserDetails`,{userData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }


}
