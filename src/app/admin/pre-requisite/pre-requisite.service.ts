import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PreRequisiteService {

  constructor(private http: HttpClient) {
   
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


  setPreRequisiteDetails(license_type,preRequisitesList,reqDocumentsList){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setPreRequisiteDetails`,{license_type,preRequisitesList,reqDocumentsList})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  updatePreRequisiteDetails(license_type,preRequisitesList,reqDocumentsList){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/updatePreRequisiteDetails`,{license_type,preRequisitesList,reqDocumentsList})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getPreRequisitesDetails(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPreRequisitesDetails`)
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  checkPreRequistiesExistence(license_type){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkPreRequistiesExistence`,{license_type})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  deletePrequisitesDetails(rowToDelete){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/deletePrequisitesDetails`,{rowToDelete})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getPreRequisitesDetailsToEdit(license_type){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getPreRequisitesDetailsToEdit`,{license_type})
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }


}
