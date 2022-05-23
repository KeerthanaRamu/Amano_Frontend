import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class GdlApplyLicenseService {


  constructor(private http: HttpClient) {
   
  }


  getNRICNumberForGDLProcess(){
    return this.http
    .get<any>(`${environment.apiUrl}/applyLicense/getNRICNumberForGDLProcess`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPassportNumberForGDLProcess(){
    return this.http
    .get<any>(`${environment.apiUrl}/applyLicense/getPassportNumberForGDLProcess`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getEnrollmentNumberListForGDL(studentdt){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/getEnrollmentNumberListForGDL`,{studentdt})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkForLicenseProcess(enrolldata){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkForLicenseProcess`,{enrolldata})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  setLicenseProcessing(enrolldata,licenseProcessData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setLicenseProcessing`,{enrolldata,licenseProcessData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
