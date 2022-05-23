import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PackageService {

  constructor(private http: HttpClient) {
   
  }

  setLicenseDetails(licenseData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setLicenseDetails`,{licenseData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLicenseListPerClient(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getLicenseListPerClient`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLicenseClassList(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getLicenseClassList`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPakageTypeList(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPakageTypeList`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPaymentPhases(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPaymentPhases`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }



  setPackageDetails(PackageFormData,package_type,license_type,payment_phase){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setPackageDetails`,{PackageFormData,package_type,license_type,payment_phase})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPackageListPerClient(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPackageListPerClient`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPackageInfoToExport(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPackageInfoToExport`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPackageToEdit(packageId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getPackageToEdit`,{packageId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updatePackageDetails(PackageFormData,package_type,license_type,payment_phase){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/updatePackageDetails`,{PackageFormData,package_type,license_type,payment_phase})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  deletePackageDetails(rowToDelete){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/deletePackageDetails`,{rowToDelete})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
