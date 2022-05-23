import { Component, OnInit,ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { TimeMasterService } from '../time-master.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.sass']
})
export class AddTimeComponent implements OnInit {

  addtimeMasterForm:FormGroup;

  showTime:boolean=true;

  constructor(private fb: FormBuilder,
    private timeMasterService:TimeMasterService,
    private toastrService:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService) {

    this.addtimeMasterForm = this.fb.group({
      id:[''],
      working_hour_from: ['',Validators.required],
      working_hour_to: ['',Validators.required],
      rest_hour_from: ['',Validators.required],
      rest_hour_to: ['',Validators.required],
      cut_over_time: ['',Validators.required],
      no_of_session:['',Validators.required]
    });
   }


  @ViewChild("timepicker") timepicker: any;


  ngOnInit(): void {
      this.getTimeDetails();
  }

  getTimeDetails(){
    this.spinner.show();
    this.timeMasterService.getTimeDetails()
    .subscribe((res)=>{
      this.spinner.hide();
      if(res['data'].length > 0){
        let resObj=res['data'][0];
        this.showTime=false;
        console.log("resObj===",resObj,(resObj.working_hour_from).substr(0, 5));
         this.addtimeMasterForm.patchValue({
           id:resObj.id,
          working_hour_from: (resObj.working_hour_from).substr(0, 5),
          working_hour_to: (resObj.working_hour_to).substr(0, 5),
          rest_hour_from: (resObj.rest_hour_from).substr(0, 5),
          rest_hour_to: (resObj.rest_hour_to).substr(0, 5),
          cut_over_time: (resObj.cut_overtime).substr(0, 5),
          no_of_session:resObj.no_of_session
         })
      }
    })
  }


  setTimeDetails(){ 
    this.spinner.show();
    console.log("setTimeDetails===",this.addtimeMasterForm.value);
    this.timeMasterService.setTimeDetails(this.addtimeMasterForm.value)
    .subscribe((res)=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.showTime=false; 
        this.toastrService.success('Updated Successfully')
      }
     if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }   
    })
  }

  updateTimeDetails(){ 
    this.spinner.show();
    console.log("setTimeDetails===",this.addtimeMasterForm.value);
    this.timeMasterService.updateTimeDetails(this.addtimeMasterForm.value)
    .subscribe((res)=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.showTime=false; 
        this.toastrService.success('Updated Successfully')
      }
     if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }   
    })
  }

}
