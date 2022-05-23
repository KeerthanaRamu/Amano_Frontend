import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ClientService {

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

  getClientCode(){
    return this.http
      .get<any>(`${environment.apiUrl}/superAdmin/getClientCode`)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }

  setClientDetails(formData){
    return this.http
      .post<any>(`${environment.apiUrl}/superAdmin/setClientDetails`,formData)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }

  updateClientDetails(formData){
    return this.http
      .post<any>(`${environment.apiUrl}/superAdmin/updateClientDetails`,formData)
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }

  deleteClientDetails(clientData){
    return this.http
      .post<any>(`${environment.apiUrl}/superAdmin/deleteClientDetails`,{clientData})
      .pipe(
        map((res) => {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return res;
        })
      );
  }


}
