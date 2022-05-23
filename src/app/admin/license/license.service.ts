import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { License } from './license-list/license.model';

@Injectable({
  providedIn: 'root',
})
export class LicenseService {

  isTblLoading = true;
  dataChange: BehaviorSubject<License[]> = new BehaviorSubject<License[]>(
    []
  );
  get data(): License[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient) {
  }

  setLicenseDetails(formData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setLicenseDetails`,formData)
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getLicenseListPerClient(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getLicenseListPerClient`)
    .pipe(
      map((res) => {
        this.isTblLoading = false;
        this.dataChange.next(res);
        return res;
      })
    );
  }

  deleteLicenseDetails(rowToDelete){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/deleteLicenseDetails`,{rowToDelete})
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

  getLicenseToEdit(licenseId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getLicenseToEdit`,{licenseId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateLicenseDetails(formData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/updateLicenseDetails`,formData)
    .pipe(
      map((res) => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return res;
      })
    );
  }

  getClientCodeForFolder(client){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getClientCodeForFolder`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


}
