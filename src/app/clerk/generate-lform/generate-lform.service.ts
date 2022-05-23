import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class GenerateLFormService {


  constructor(private http: HttpClient) {
   
  }

  getStatusList(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getStatusList`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCurrentDaySalesReport(client){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getCurrentDaySalesReport`,{client})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLformFilterData(lformData){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getLformFilterData`,{lformData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  getDateFilteredData(lformData){
    return this.http
    .post<any>(`${environment.apiUrl}/report/getDateFilteredData`,{lformData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
