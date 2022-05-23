import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Calendar } from "./schedule.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {

  private readonly API_URL = "assets/data/calendar.json";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  dataChange: BehaviorSubject<Calendar[]> = new BehaviorSubject<Calendar[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private http: HttpClient) {}
  get data(): Calendar[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCalendars(): Observable<Calendar[]> {
    return this.http
      .get<Calendar[]>(this.API_URL)
      .pipe(catchError(this.errorHandler));
  }


  deleteCalendar(calendar: Calendar): void {
    this.dialogData = calendar;
  }
  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  getScheduleList(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getScheduleList`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  getScheduleDetailsForInstructor(){
    //this.dialogData = calendar;
    return this.http
    .get<any>(`${environment.apiUrl}/instructor/getScheduleDetailsForInstructor`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getStudentDetailsForInstructor(calendarData){
    //this.dialogData = calendar;
    return this.http
    .post<any>(`${environment.apiUrl}/instructor/getStudentDetailsForInstructor`,{calendarData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  getTimeDetails(){
    return this.http
      .get<any>(`${environment.apiUrl}/webRoutes/getTimeDetails`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateScheduleStatus(studentData){
    //this.dialogData = calendar;
    return this.http
    .post<any>(`${environment.apiUrl}/instructor/updateScheduleStatus`,{studentData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  

}
