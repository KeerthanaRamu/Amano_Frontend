import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit  } from '@angular/core';
import { StudentScheduleService } from '../../students-schedule.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import {  FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { Calendar } from '../../students-schedule.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})


export class FormDialogComponent implements  OnInit {

  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  showDeleteBtn = false;
  scheduleList : any;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedInstructor: any;
  enrollData:any;
  finalArray: any[] = [];
  existingArray:any[]=[];
  actionData: any;
  timeArray: any[];
  disableConfirm: boolean=false;
  scheduleText: string;
  disableSubmit: boolean=false;
  scheduleCount: any=0;
  // filteredTimeArray:any[];


  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: StudentScheduleService,
    private fb: FormBuilder,private toastrService: ToastrService,
    private router:Router,private spinner:NgxSpinnerService
  ) {
    // Set the defaults
    
    this.action = data.action;
    this.actionData=data.calendar;
    this.timeArray=data.timeData;
    
    this.getScheduleList();
  }
  ngOnInit(): void {
    if (this.action === 'edit') {
      this.spinner.show();
      this.dialogTitle = this.actionData.title;
      this.calendar = this.actionData;
      console.log("data.calendar============",this.calendar);
      this.enrollData={
        schedule_view:this.actionData.schedule_view,
        studentId:this.actionData.enrollData.student_id, 
        enrollId:this.actionData.enrollData.enroll_id,
        licenseId:this.actionData.enrollData.license_id,
        statusId:this.actionData.statusid,
        scheduleDate:this.actionData.startDate,
        result:this.actionData.enrollData.result,
        test_flag:this.actionData.enrollData.test_flag
      };
   
      let existingSchedule=[];
      for(let j=0;j<this.timeArray.length;j++){
        this.timeArray[j].employeeList=[];
      }
      this.calendarService.getSelectedScheduleInfoStudent(this.actionData,this.enrollData)  //ck
      .subscribe(res=>{
        this.scheduleCount=0;
        this.spinner.hide();
        console.log("1111---------------",res['scheduleList'],res['existingSchedule'])
        if(res['status'] == 'Success'){
            let resData=res['scheduleList'];
            existingSchedule=res['existingSchedule'];
            if(this.actionData.schedule_view == 'All'){ 
              this.scheduleText="Schedule KPP01";
              this.scheduleCount=res['schedCount'][0].scheduleCount;
              this.disableConfirm=false;
              for(let i=0;i<resData.length;i++){
                for(let j=0;j<this.timeArray.length;j++){
                  let timeSlotDt=this.zeroPad(resData[i].TimeSlot,this.timeArray.length);
                  console.log("timeSlotDt====",timeSlotDt);
                  if(timeSlotDt[j] == 1){
                    this.timeArray[j].employeeList=[];
                    this.timeArray[j].disabled=false;
                    this.timeArray[j].checked=false;
                  }else{
                    this.timeArray[j].employeeList=[];
                    this.timeArray[j].disabled=true;
                    this.timeArray[j].checked=false;
                  }
                }
              }
              if(existingSchedule.length > 0){
                this.finalArray=[];
                this.existingArray=[];
                this.showDeleteBtn=true;
                if(existingSchedule[0].status_id == 4){
                  this.scheduleText="KPP01 is Scheduled";
                  this.disableConfirm=true;
                }else{
                  for(let i=0;i<existingSchedule.length;i++){
                    for(let j=0;j<this.timeArray.length;j++){
                      let timeSlotDt=this.zeroPad(existingSchedule[i].TimeSlot,this.timeArray.length);
                      console.log("exists----timeslot-----",timeSlotDt)
                      if(timeSlotDt[j] == 1){
                        this.timeArray[j].employeeList=[];
                        this.timeArray[j].checked=true;
                        this.finalArray.push(this.timeArray[j]);
                        this.existingArray.push(this.timeArray[j])
                      }else{
                        this.timeArray[j].employeeList=[];
                        this.timeArray[j].checked=false;
                      }
                      console.log("this.timeArray==111111111111==",this.timeArray,this.finalArray)
                    }
                  }
                }
              }

            }else{
              console.log("this.finalArray----------",this.finalArray)
              for(let i=0;i<resData.length;i++){
                for(let j=0;j<this.timeArray.length;j++){
                  let timeSlotDt=this.zeroPad(resData[i].TimeSlot,this.timeArray.length);
                    if(timeSlotDt[j] == 1){
                      this.timeArray[j].employeeList.push({
                        id:resData[i].employee_id,
                        name:resData[i].employeeName,
                        checked:false
                      })
                    }
                }
              }
              if(existingSchedule.length > 0){
                this.finalArray=[];
                this.existingArray=[];
                let count=0;
                for(let i=0;i<existingSchedule.length;i++){
                  count=count+(existingSchedule[i].schedule_status == 1 ? 1 : 0)
                  for(let j=0;j<this.timeArray.length;j++){
                    let timeSlotDt=this.zeroPad(existingSchedule[i].TimeSlot,this.timeArray.length);
                    console.log("exists----timeslot-----",timeSlotDt)
                    if(timeSlotDt[j] == 1){
                      if(this.timeArray[j].employeeList.length > 0 ){
                        for(let k=0;k<this.timeArray[j].employeeList.length;k++){
                            if(this.timeArray[j].employeeList[k].id == existingSchedule[i].employee_id){
                              this.timeArray[j].employeeList[k].checked=true;
                              this.timeArray[j].employeeList[k].disabled=(existingSchedule[i].schedule_status == 1 ? true :false);
                                var obj=this.timeArray[j];
                                obj.schedule_status=existingSchedule[i].schedule_status;
                                obj.selected=this.timeArray[j].employeeList[k];
                                this.finalArray.push(obj);
                                this.existingArray.push(obj)
                                console.log("existing------",this.finalArray)
                            }else{
                              this.timeArray[j].employeeList[k].checked=false;  
                            }
                        }
                      }
                    }
                  }
                }
                if(count > 0){
                  this.showDeleteBtn=false;
                  // this.disableSubmit=true
                }else{
                    this.showDeleteBtn=true;
                    // this.disableSubmit=false;
                }
              }
            } 
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
      this.calendarForm = this.editContactForm();
    }
  }

  zeroPad(num,total) {
    return num.toString().padStart(Number(total), "0");
  }

  clearSelection(){
    console.log("this.timeArray-----")
    for(let i=0;i<this.timeArray.length;i++){
      for(let j=0;j<this.timeArray[i].employeeList.length;j++){
        this.timeArray[i].employeeList[j].checked=false;
      }
      
    }
  }


  editContactForm(): FormGroup {
    return this.fb.group({
      id: [this.calendar.id],
      lead_time: [
        this.calendar.lead_time,
        [Validators.required]
      ],
      schedule_name: [this.calendar.schedule_name],
      schedule_view: [this.calendar.schedule_view],
      startDate: [this.calendar.startDate,
      [Validators.required]
      ],
      endDate: [this.calendar.endDate,
      [Validators.required]
      ],
      scheduleDate:[new Date(this.calendar.startDate)]
    });
  }
 
  
  submit(){

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  setStudentScheduleInfo() {
    this.spinner.show();
    console.log("this.enrollData==========",this.enrollData);
    let rangelist=[];
    for(let i=0;i<this.finalArray.length;i++){
      rangelist.push(this.finalArray[i].range);
      this.finalArray[i].timeSlot='';
      if(this.actionData.schedule_view == 'All'){
        for(let j=0;j<this.timeArray.length;j++){
          this.finalArray[i].timeSlot=this.finalArray[i].timeSlot+(this.finalArray[i].range == this.timeArray[j].range ? 1 : 0)
        }
      }else{
        for(let j=0;j<this.timeArray.length;j++){
          this.finalArray[i].timeSlot=this.finalArray[i].timeSlot+(this.finalArray[i].range == this.timeArray[j].range ? 1 : 0)
        }
      }
    }

    var curr = new Date(this.enrollData.scheduleDate); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    console.log("firstday=====",firstday,lastday);
    // if(this.finalArray.length > this.existingArray.length){
      var lengthToCheck=this.finalArray.length-this.existingArray.length;
      console.log("lengthToChaeck======",lengthToCheck,this.enrollData);
      this.calendarService.checkSessionPerWeek(this.enrollData,firstday,lastday,lengthToCheck)
      .subscribe(res=>{
          if(res['status'] == 'Success'){
            var finalData=this.finalArray.filter(el=>el.schedule_status != 1);
            this.calendarService.setStudentScheduleInfo(finalData,this.enrollData,rangelist)
              .subscribe(res=>{
                  this.spinner.hide();
                  if(res['status'] == 'Success'){
                    this.toastrService.success("Scheduled Successfully!!");
                    this.dialogRef.close('submit');
                  }
                  if(res['status'] == 'Session Expired'){
                    this.toastrService.error("Session Expired!!!")
                    this.router.navigate(['/authentication/signin']);
                  }
              })
          }else if(res['status'] == 'Session Expired'){
            this.spinner.hide();
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }else if(res['status'] == 'Exceeded'){
            this.spinner.hide();
            this.toastrService.warning('Per Week Only '+Number(res['noOfSession'])+' hours is allowed!!!')
          }else if(res['status'] == 'onlyOnce'){
            this.spinner.hide();
            this.toastrService.warning('Can schedule Only Once!!!')
          }else if(res['status'] == 'slotExceed'){
            this.spinner.hide();
            this.toastrService.warning(res['numberOfHours']+ ' hours is scheduled already!!!')
          }else if(res['status'] == 'currentExceed'){
            this.spinner.hide();
            this.toastrService.warning('Only '+res['numberOfHours']+ ' hours can be scheduled!!!')
          }
      })
    // }else{
    //   var finalData=this.finalArray.filter(el=>el.schedule_status != 1);
    //   this.calendarService.setStudentScheduleInfo(finalData,this.enrollData,rangelist)
    //   .subscribe(res=>{
    //       this.spinner.hide();
    //       if(res['status'] == 'Success'){
    //         this.toastrService.success("Scheduled Successfully!!");
    //         this.dialogRef.close('submit');
    //       }
    //       if(res['status'] == 'Session Expired'){
    //         this.toastrService.error("Session Expired!!!")
    //         this.router.navigate(['/authentication/signin']);
    //       }
    //   })
    // }
    


   
  }

  setStudentScheduleInfoForKPP01(){
    this.spinner.show();
    var curr = new Date(this.enrollData.scheduleDate); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    console.log("firstday=====",firstday,lastday)
      var lengthToCheck=this.finalArray.length-this.existingArray.length;
      console.log("lengthToChaeck======",lengthToCheck);
      this.calendarService.checkSessionPerWeek(this.enrollData,firstday,lastday,lengthToCheck)
      .subscribe(res=>{
          if(res['status'] == 'Success'){
            this.calendarService.setStudentScheduleInfoForKPP01(this.enrollData)
            .subscribe(res=>{
                this.spinner.hide();
                if(res['status'] == 'Success'){
                  this.toastrService.success("Scheduled Successfully!!");
                  this.dialogRef.close('submit');
                }
                if(res['status'] == 'Session Expired'){
                  this.toastrService.error("Session Expired!!!")
                  this.router.navigate(['/authentication/signin']);
                }
            })
          }else if(res['status'] == 'onlyOnce'){
            this.spinner.hide();
            this.toastrService.warning('Can schedule Only Once!!!')
          }else if(res['status'] == 'Session Expired'){
            this.spinner.hide();
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }else{
            this.spinner.hide();
            this.toastrService.warning('Per Week Only '+Number(res['noOfSession'])+' hours is allowed!!!')
          }
      })
  }

  deleteStudentSchedule(){
    this.calendarService.deleteStudentSchedule(this.enrollData)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success("Deleted Successfully!!");
        this.dialogRef.close('submit');
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
    })
  }

  displayFn(user): string {
    return user && user.name ? user.name : '';
  }

  
  
  instructorChange(event,empdt,data){
    var obj = this.timeArray.filter(x => x.range == data.range)[0];
    console.log("event.value========",event.checked,empdt,data);
    this.removeById(this.finalArray,data.range);
    if(event.checked == true){
      for(let i=0;i<data.employeeList.length;i++){
        if(empdt.id == data.employeeList[i].id){
          data.employeeList[i].checked=true;
          obj.selected = empdt;
        }else{
          data.employeeList[i].checked=false;
        }
      }
      if (!this.finalArray.some(x => x.range == data.range)) {
            this.finalArray.push(obj);
      }
    }
    console.log("this.finalArray=====",this.finalArray)
  }

  removeById(arr, id){
    const requiredIndex = arr.findIndex(el => {
      console.log("el.range----",el.range,id)
       return el.range == id;
    });
    if(requiredIndex === -1){
       return false;
    };
    console.log("requiredIndex===",requiredIndex)
    return arr.splice(requiredIndex, 1);
 };
  
  // instructorChange(event, data){
  //   var obj = this.timeArray.filter(x => x.range == data.range)[0];
  //   console.log("event.value========",event)
  //   obj.selected = event.value;
  //   if (!this.finalArray.some(x => x.range == data.range)) {
  //         this.finalArray.push(obj);
  //   }
  // }

  changeTimeDt(event: MatRadioChange, data) {
    console.log("---------",event,data)
    var obj = this.timeArray.filter(x => x.range == data.range)[0];
    console.log("event.value========",event)
    obj.selected = event.value;
    this.finalArray=[];  //for single selection
    if (!this.finalArray.some(x => x.range == data.range)) {
          this.finalArray.push(obj);
    }
    console.log("this.filteredTimeArray---change------",this.finalArray);
  }


  getScheduleList(){
    this.calendarService.getScheduleList()
    .subscribe(res=>{
        this.scheduleList=res['data'];
    })
  }

 

}
