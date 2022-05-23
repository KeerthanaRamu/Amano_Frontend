import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../reports.service';
import { ToastrService } from 'ngx-toastr';
import { Observable,map, startWith,debounceTime,switchMap,of } from 'rxjs';
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


function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any }  => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-pending-report',
  templateUrl: './pending-report.component.html',
  styleUrls: ['./pending-report.component.sass']
})
export class PendingReportComponent implements OnInit {

  apiURL=environment.apiUrl;
  pendingReportForm: FormGroup;
  nricNumberData:any;
  passportNumberData:any;
  licenseInfo: any;
  studentInfo: any;
  payInfo: any;
  payment_type=new FormControl('Cash');
  reference_no=new FormControl('');
  payamount: any;
  rowToBeDeleted: any;
  dialogRef: MatDialogRef<any>;
  disableReference: boolean=true;

  constructor(private reportService:ReportsService,
    private toastrService:ToastrService,
    private fb: FormBuilder,
    private spinner:NgxSpinnerService,
    private modalService: NgbModal,public dialog: MatDialog) {

    this.pendingReportForm = this.fb.group({
      from_date: [new Date()],
      to_date: [new Date()],
    });
   }

  nric_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  passport_number= new FormControl('', { validators: [autocompleteObjectValidator()] });

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

 
  nricNumberList: Observable<string[]>;
  passportNumberList: Observable<string[]>;

  public validation_msgs = {
    'nric_number': [
      { type: 'invalidAutocompleteObject', message: 'NRIC Number not recognized. Click one of the options.' }
    ],
    'passport_number': [
      { type: 'invalidAutocompleteObject', message: 'Passport Number not recognized. Click one of the options.' }
    ]
  }

  columns = [
    { name: 'Name' },
    { name: 'NRIC Number' },
    { name: 'Passport Number' },
    {name: 'Enrollment Number'},
    {name: 'Mobile'},
    {name: 'Email'}
  ]; 
  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');

  ngOnInit(): void {
    this.getNRICNumberForPendingReport();
    this.getPendingReport();
  }

  refresh() {
    this.pendingReportForm.patchValue({
      from_date:'',
      to_date:''
    });
    this.nric_number.patchValue('')
    this.passport_number.patchValue('')
    this.data=[];
    this.filteredData=[];
  }

  getNRICNumberForPendingReport(){
    this.reportService.getNRICNumberForPendingReport()
      .subscribe(res=>{
        this.nricNumberData=res;
        console.log("this.nricNumberData===",this.nricNumberData)
        this.nricNumberList = this.nric_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.nric_number)),
          map(name => (name ? this._filterNricNumber(name) : this.nricNumberData.slice())),
        );
      })
  }

  getPassportNumberForPendingReport(){
    this.reportService.getPassportNumberForPendingReport()
      .subscribe(res=>{
        this.passportNumberData=res;
        this.passportNumberList = this.passport_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.passport_number)),
          map(name => (name ? this._filterPassportNumber(name) : this.passportNumberData.slice())),
        );
      })
  }

  displayFnNRICNUmber(user): string {
    return user && user.nric_number ? user.nric_number : '';
  }

  displayFnPassportNumber(user): string {
    return user && user.passport_number ? user.passport_number : '';
  }

  private _filterNricNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.nricNumberData.filter(option => option.nric_number.toLowerCase().includes(filterValue));
  }

  private _filterPassportNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.passportNumberData.filter(option => option.passport_number.toLowerCase().includes(filterValue));
  }

  selectedNricNumber(event){
    if(event.option.value.id){
      this.passport_number.setValue('');
    }
  }

  selectedPassportNumber(event){
    if(event.option.value.id){
      this.nric_number.setValue('');
    }
  }

  getAutoReceiptNumber(){
    this.reportService.getAutoReceiptNumber().subscribe(res=>{
      if(res['status'] == 'Success'){
        console.log("res-----rec====",res);
        if(this.payment_type.value == 'Cash'){
            this.reference_no.patchValue(res['receiptNo']);
            this.disableReference=true;
        }else{
            this.reference_no.patchValue('');
            this.disableReference=false;
        }
      }
    })
  }

  changePaymentType(){
    this.getAutoReceiptNumber();
  }

  getPendingReport(){
    // this.spinner.show();
    this.data=[];
    this.filteredData=[];
    console.log("this.pendingReportForm.value===",this.pendingReportForm.value, this.nric_number.value, this.passport_number.value);
    let studentId=(this.nric_number.value ? this.nric_number.value.id :(this.passport_number.value ? this.passport_number.value.id : ''))
      this.reportService.getPendingReport(this.pendingReportForm.value,studentId)
      .subscribe((res)=>{
        this.spinner.hide();
        console.log("res---data---",res);
        if(res['data'].length > 0 ){
          this.data=res['data'];
          this.filteredData=res['data'];
        }else{
          this.toastrService.warning("No Data!!!!")
        }
        
      })
  }

  viewLicenseDetails(row,index,viewlicense){
    console.log("row--",row);
    this.studentInfo=row;
    this.reportService.getStudentLicenseDetails(row)
    .subscribe(res=>{
      this.licenseInfo=res['data'][0];
      this.licenseInfo.package_name=this.licenseInfo['package_'+this.translateVal];
      this.licenseInfo.package_description=this.licenseInfo['package_desc_'+this.translateVal];
      this.licenseInfo.package_type=this.licenseInfo['package_type_'+this.translateVal];
      this.licenseInfo.payment_phase=this.licenseInfo['payment_phase_'+this.translateVal];
      this.licenseInfo.licenseList = this.licenseInfo.license_class + ' - ' +this.licenseInfo['license_desc_'+this.translateVal]
      this.modalService.open(viewlicense, { ariaLabelledBy: 'modal-basic-title' });

    })
  }

  makePayment(row,index,showPay){
    this.getAutoReceiptNumber();
    this.payamount=row.payment_phase == 1 ? row.final_price : row.first_phase_price;
    this.payInfo=row;
    this.modalService.open(showPay, { ariaLabelledBy: 'modal-basic-title' });

  }

  setPaymentDetails(){
    console.log("this.payInfo====",this.payInfo,this.payment_type);
    this.reportService.setPendingPaymentDetails(this.payInfo,this.payment_type.value,this.reference_no.value,this.payamount)
    .subscribe(res=>{
        this.toastrService.success('Updated Successfully!!');
        this.modalService.dismissAll();
        this.getPendingReport();
        this.reportService.getStudentLicenseDetails(this.payInfo)
        .subscribe(res=>{
            this.licenseInfo=res['data'][0];
            this.licenseInfo.licenseList=this.licenseInfo.license_class + ' - ' +this.licenseInfo['license_desc_'+this.translateVal];
            let payData={
              payment_amount:this.payamount,
              payment_method:this.payment_type.value
            }
            this.dialogRef = this.dialog.open(ReceiptDialogComponent);
            this.dialogRef.componentInstance.data = this.payInfo;
            this.dialogRef.componentInstance.licenseData = this.licenseInfo.licenseList;
            this.dialogRef.componentInstance.payInfo = payData;
            this.dialogRef.componentInstance.packDt = this.licenseInfo;
            this.dialogRef.componentInstance.enrollment_no = this.payInfo.enrollment_no;
        })
    })
  }

  deleteLicenseDetails(row,index,deleteLicense){
    this.rowToBeDeleted=row;
    this.modalService.open(deleteLicense, { ariaLabelledBy: 'modal-basic-title' });
  }

  deleteStudentDetails(){
    this.reportService.deleteStudentDetails(this.rowToBeDeleted)
    .subscribe(res=>{
        this.toastrService.success('Deleted Successfully!!');
        this.modalService.dismissAll();
        this.getPendingReport();
    })
  }


  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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
        title: 'Pending Payment',
        useBom: true,
        noDownload: false,
        headers: ["Student Name","NRIC Number", "Passport Number","Moile Number","Package Name"]
      };
      let fileName='Pending Payment'
      console.log("this.filteredData========",this.filteredData,fileName);
      const result = this.filteredData.map(({id,enroll_id,enrollment_no,email_id,date_of_birth,gender,address_nric,city,state,package_malay,payment_phase,license_id,final_price,first_phase_price,...rest}) => ({...rest}));
      new ngxCsv(result, fileName, options);
    }
    
  }

}

