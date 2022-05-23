import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApplyLicenseService {

  licenseSelectedData: any;
  packageInfo: any;

  constructor(private http: HttpClient) {
   
  }

  setSelectedLicenseInfo(licenseData){
      this.licenseSelectedData=licenseData;
  }

  getSelectedLicenseInfo(){
    return this.licenseSelectedData;
  }


  setPackageInfoForFlowImage(packDt){
    this.packageInfo=packDt;
  }

  getPackageInfoForFlowImage(){
    return this.packageInfo;
  }
  
  getExistingLicense(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getExistingLicense`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getBaseLicenseList(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getBaseLicenseList`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getNRICNumberToApplyLicense(){
    return this.http
    .get<any>(`${environment.apiUrl}/applyLicense/getNRICNumberToApplyLicense`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPassportNumberToApplyLicense(){
    return this.http
    .get<any>(`${environment.apiUrl}/applyLicense/getPassportNumberToApplyLicense`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getValidLicenseByIcNumber(icData,cdl_license){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/getValidLicenseByIcNumber`,{icData,cdl_license})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getValidLicenseByCDL(cdl_license,dateOfBirth){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/getValidLicenseByCDL`,{cdl_license,dateOfBirth})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLicenseListPerBaseLicense(base_license,licenseInfo,existing_licenseData,dateOfBirth){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/getLicenseListPerBaseLicense`,{base_license,licenseInfo,existing_licenseData,dateOfBirth})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPackageInfoForLicense(existingLicenseInfo,cdl_license,licenseList){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/getPackageInfoForLicense`,{existingLicenseInfo,cdl_license,licenseList})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLicenseFlowImage(packDt){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/getLicenseFlowImage`,{packDt})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkLicenseApplied(nricInfo,passportInfo,packDt,gdlLicense,psvLicense){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/checkLicenseApplied`,{nricInfo,passportInfo,packDt,gdlLicense,psvLicense})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkLicenseAppliedForUpdate(packDt){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/checkLicenseAppliedForUpdate`,{packDt})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getAutoReceiptNumber(){
    return this.http
    .get<any>(`${environment.apiUrl}/applyLicense/getAutoReceiptNumber`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  setCustomerPackageDetails(formData){
    return this.http
    .post<any>(`${environment.apiUrl}/applyLicense/setCustomerPackageDetails`,formData)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
