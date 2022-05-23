import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ScheduleService } from '../../schedule.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemarksDialogComponent } from '../remarks-dialog/remarks-dialog.component';
import { UnsubscribeOnDestroyAdapter } from '../../../../shared/UnsubscribeOnDestroyAdapter';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})


export class FormDialogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar;
  showDeleteBtn = false;
  ViewAssignList;
  scheduleList;
  studentData;
  timeArray : any;
  actionData: any;
  dataToUpdate: any;
  selectedStudentData: any=[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    public dialogRef1: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: ScheduleService, private modalService: NgbModal,public dialog: MatDialog,
    private fb: FormBuilder,private toastrService: ToastrService,private spinner: NgxSpinnerService
  ) {
    super();
    // Set the defaults
    this.action = data.action;
    this.actionData=data;  
    this.timeArray=data.timeData;
  }

  ngOnInit(): void {
    if(this.action === 'edit') {
      this.dialogTitle = this.actionData.calendar.title;
      this.calendar = this.actionData.calendar;
      console.log("this.calendar------------------",this.calendar);
      this.studentData=[];
      this.spinner.show();
      this.calendarService.getStudentDetailsForInstructor(this.calendar)
      .subscribe((res)=>{
          this.studentData=res['data'];
          console.log("studentData==========",this.studentData);
          if(this.studentData.length > 0){
            for(let i=0;i<this.studentData.length;i++){
              for(let j=0;j<this.timeArray.length;j++){
                // this.timeArray[j].studentList=[];
                let timeSlotDt=this.zeroPad(this.studentData[i].TimeSlot,this.timeArray.length);
                  if(timeSlotDt[j] == 1){
                    console.log("1111111111")
                    this.timeArray[j].studentList.push({
                      id:this.studentData[i].id,
                      license_id:this.studentData[i].license_id,
                      enrollid:this.studentData[i].enroll_id,
                      name:this.studentData[i].name,
                      id_number:(this.studentData[i].nric_number != null ?  this.studentData[i].nric_number : this.studentData[i].passport_number ),
                      nric_number:this.studentData[i].nric_number,
                      passport_number:this.studentData[i].passport_number,
                      mobile_number:this.studentData[i].mobile_number,
                      email_id:this.studentData[i].email_id,
                      schedule_id:this.studentData[i].schedule_id,
                      sch_status_id:this.studentData[i].sch_status_id,
                      TimeSlot:this.studentData[i].TimeSlot,
                      schedule_status:this.studentData[i].schedule_status,
                      enrollment_no:this.studentData[i].enrollment_no,
                    })
                  }
              }
            }

            for(let i=0;i<this.studentData.length;i++){
              if(this.studentData[i].schedule_status == 1){
                this.selectedStudentData.push(this.studentData[i]);
              }
            }

            console.log("this.selectedStudentData----------",this.selectedStudentData)
          }else{
            for(let j=0;j<this.timeArray.length;j++){
              this.timeArray[j].studentList=[];
            }
          }
         
          this.spinner.hide();
          console.log("this.timeArray=======",this.timeArray);
      })
  }
  }

  confirmUpdate(event: MatCheckboxChange, timeDt,studDt,addRemarks){
    console.log("timeDt===========",timeDt,studDt);
    if (event.checked == true) { 
      const dialogRef1 = this.dialog.open(RemarksDialogComponent,{
        data:studDt
      })
      dialogRef1.updateSize("500px", "220px");
      this.subs.sink = dialogRef1.afterClosed().subscribe((result) => {
       studDt.sch_remarks=(result ? result.data :'');
       this.selectedStudentData.push(studDt);
        if (!this.selectedStudentData.some(x => x.schedule_id == studDt.schedule_id)) {
          this.selectedStudentData.push(studDt);
        }
      })
    }else{
        this.removeById(this.selectedStudentData,studDt.schedule_id)
    }
    
  }
 

  removeById(arr, id){
    const requiredIndex = arr.findIndex(el => {
      console.log("el.schedule_id----",el.schedule_id,id)
       return el.schedule_id == id;
    });
    if(requiredIndex === -1){
       return false;
    };
    console.log("requiredIndex===",requiredIndex)
    return arr.splice(requiredIndex, 1);
 };

  updateScheduleStatus(){  //enable CK
    console.log("this.timeArray------------",this.selectedStudentData,this.calendar);
    let today=this.isToday(this.calendar.startDate);
    let scheduleDate=new Date(this.calendar.startDate);
    console.log("scheduleDate==========",today)
    // if(today == true){
          this.calendarService.updateScheduleStatus(this.selectedStudentData)
          .subscribe(res=>{
            if(res['status']  == 'Success'){
              this.toastrService.success("Updated Successfully!!!!");
            }
          })
    // }else{
    //   this.toastrService.warning("Can't Update before/after scheduled Date!!")
    // }
    
  }

  isToday(someDate) {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  zeroPad(num,total) {
    return num.toString().padStart(Number(total), "0");
  }

}
