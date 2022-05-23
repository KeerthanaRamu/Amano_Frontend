import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient,private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<boolean>(false);
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login/getLoginUser`, {
        username:username,
        password:password})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }


  checkUserLoggedIn(){
    return this.http
      .get<any>(`${environment.apiUrl}/login/checkUserLoggedIn`)
      .pipe(
        map((res) => {
          console.log("res===========",res)
         return res;
        })
      );
  }


  getCurrentClient(){
    return this.http
    .get<any>(`${environment.apiUrl}/login/getCurrentClient`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateClientLogo(formData){
    return this.http
    .post<any>(`${environment.apiUrl}/login/updateClientLogo`, formData )
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateUserCredentials(userInfo){
    return this.http
    .post<any>(`${environment.apiUrl}/login/updateUserCredentials`, {
      userInfo
    })
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateAccountDetails(formData){
    return this.http
    .post<any>(`${environment.apiUrl}/login/updateAccountDetails`,formData)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  sendForgotPasswordLink(emailid){
    return this.http
    .post<any>(`${environment.apiUrl}/login/sendForgotPasswordLink`,{emailid})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updatePasswordDetails(resetInfo){
    return this.http
    .post<any>(`${environment.apiUrl}/login/updatePasswordDetails`,{resetInfo})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  logout() {
    // remove user from local storage to log user out
    return this.http
    .get<any>(`${environment.apiUrl}/login/logout`)
    .pipe(
      map((res) => {
        this.currentUserSubject.next(false);
        return res;
      })
    );
    
  }
}
