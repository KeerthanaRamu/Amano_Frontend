import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Calendar } from "./students-schedule.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentScheduleService {

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
      errorMessage = error.error.message;
    } else {
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


  getAutoReceiptNumber(){
    return this.http
    .get<any>(`${environment.apiUrl}/applyLicense/getAutoReceiptNumber`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getScheduleDetailsForStudent(statusid){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getScheduleDetailsForStudent`,{statusid})
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
  
  getSelectedScheduleInfoStudent(calendarInfo,enrollData){
    return this.http
      .post<any>(`${environment.apiUrl}/webRoutes/getSelectedScheduleInfoStudent`,{calendarInfo,enrollData})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getNRICNumberForStudentSchedule(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getNRICNumberForStudentSchedule`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getPassportNumberForStudentSchedule(){
    return this.http
    .get<any>(`${environment.apiUrl}/webRoutes/getPassportNumberForStudentSchedule`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getEnrollmentNumberForSchedule(studentId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getEnrollmentNumberForSchedule`,{studentId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLicenseListPerEnroll(studentId,enrollId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getLicenseListPerEnroll`,{studentId,enrollId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkPaymentDone(studentInfo){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkPaymentDone`,{studentInfo})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkPaymentDoneForGDLProcess(studentInfo){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkPaymentDoneForGDLProcess`,{studentInfo})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  getStudentSchedulePerEnroll(studentInfo,statusId){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/getStudentSchedulePerEnroll`,{studentInfo,statusId})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  setStudentScheduleInfo(finalArray,enrollData,rangelist){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setStudentScheduleInfo`,{finalArray,enrollData,rangelist})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  setStudentScheduleInfoForKPP01(enrollData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setStudentScheduleInfoForKPP01`,{enrollData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteStudentSchedule(enrollData){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/deleteStudentSchedule`,{enrollData})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  setPaymentDetails(license_type,amountToBePaid,payment_type,reference_no){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/setPaymentDetails`,{license_type,amountToBePaid,payment_type,reference_no})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkSessionPerWeek(enrollData,firstday,lastday,slotSelected){
    return this.http
    .post<any>(`${environment.apiUrl}/webRoutes/checkSessionPerWeek`,{enrollData,firstday,lastday,slotSelected})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
