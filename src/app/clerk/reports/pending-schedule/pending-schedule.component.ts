import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../reports.service';
import { ToastrService } from 'ngx-toastr';
import { Observable,map, startWith,debounceTime,switchMap,of, BehaviorSubject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ReceiptDialogComponent} from '../../apply-license/receipt-dialog/receipt-dialog.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any }  => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-pending-schedule',
  templateUrl: './pending-schedule.component.html',
  styleUrls: ['./pending-schedule.component.sass']
})
export class PendingScheduleComponent implements OnInit {
  
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');

  data:any;
  statusList:any;
  pendingScheduleForm: FormGroup;
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  filteredData = [];

  constructor(private reportService:ReportsService,
    private toastrService:ToastrService,
    private fb: FormBuilder,
    private spinner:NgxSpinnerService,
    private modalService: NgbModal,public dialog: MatDialog) {
      this.pendingScheduleForm = this.fb.group({
        status:['']
      });
   
   }

  
 

  ngOnInit(): void {
    this.getPendingScheduleStatus();
  }


  getPendingScheduleStatus(){
    this.reportService.getPendingScheduleStatus()
    .subscribe((res)=>{
        this.statusList=res;
    })
  }

  statusChange(){
    this.data=[];
    this.getPendingScheduleDetails();
  }


  getPendingScheduleDetails(){
    this.data=[];
    this.reportService.getPendingScheduleDetails(this.pendingScheduleForm.value.status)
    .subscribe((res)=>{
        this.data=res;
        this.filteredData=this.data;
        for(let i=0;i<this.data.length;i++){
          this.data[i].nricNo = (this.data[i].nric_number != null ?  this.data[i].nric_number : this.data[i].passport_number);
          this.data[i].package_name = this.data[i]['package_'+this.translateVal];
          this.data[i].license = this.data[i].license_class;
        }
    })
  }


  exportToExcel(){
    // var filterKey=
    if(this.filteredData.length > 0){
      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Pending Schedule',
        useBom: true,
        noDownload: false,
        headers: ["Student Name","Moile Number","IC Number","Package Name","License"]
      };
      let fileName='Pending Payment'
      console.log("this.filteredData========",this.filteredData,fileName);
      const result = this.filteredData.map(({nric_number,passport_number,package_english,package_malay,license_class,student_id,enroll_id,license_id,status_id,result,payment_phase,...rest}) => ({...rest}));
      new ngxCsv(result, fileName, options);
    }
    
  }

}

