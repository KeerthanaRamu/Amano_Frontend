import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  constructor(private http: HttpClient) {
   
  }

  getRaceList() :Observable<any>{
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getRaceList`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getNRICTypeList() :Observable<any>{
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getNRICTypeList`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getNationalityList() :Observable<any>{
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getNationalityList`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPostalCode() :Observable<any>{
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPostalCode`)
    .pipe(
      map((res) => {
        
        return res;
      })
    );
  }

  getExistingLicense() :Observable<any>{
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getExistingLicense`)
    .pipe(
      map((res) => {
        
        return res;
      })
    );
  }

  getPreferenceList() :Observable<any>{
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPreferenceList`)
    .pipe(
      map((res) => {
        
        return res;
      })
    );
  }

  getPlaceBirth() :Observable<any>{
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPlaceBirth`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkUsernameExistence(user_name :string) :Observable<any>{
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkUsernameExistence`,{user_name})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
  

  checkNRICExistence(nric_number : string) :Observable<any>{
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkNRICExistence`,{nric_number})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkPassportExistence(passport_number :string) :Observable<any>{
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkPassportExistence`,{passport_number})
    .pipe(
      map((res) => {
        
        return res;
      })
    );
  }



  setStudentDetails(formData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setStudentDetails`,formData)
    .pipe(
      map((res) => {
        
        return res;
      })
    );
  }

  getStudentListPerClient(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getStudentListPerClient`)
    .pipe(
      map((res) => {
        
        return res;
      })
    );
  }

  deleteStudentDetails(rowToDelete){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/deleteStudentDetails`,{rowToDelete})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getStudentDetailToEdit(studentId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getStudentDetailToEdit`,{studentId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateConfirmStudentDetails(formData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/updateConfirmStudentDetails`,formData)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getParticularStudentDetails(studentId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getParticularStudentDetails`,{studentId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getClientCodeForFolder(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getClientCodeForFolder`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


}
