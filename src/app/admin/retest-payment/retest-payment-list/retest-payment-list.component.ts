import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RetestPaymentService } from '../retest-payment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith } from 'rxjs';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-retest-payment-list',
  templateUrl: './retest-payment-list.component.html',
  styleUrls: ['./retest-payment-list.component.scss']
})
export class RetestPaymentListComponent implements OnInit {
 
  data=[];
  filteredData = [];
  addRetestPaymentForm:FormGroup;
  editRetestPaymentForm:FormGroup;
  rowToDelete: any;
  retestList:any;
  licenseClassData:any;

  hide = true;

  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  
  licenseClassList: Observable<string[]>;


  constructor(
    private fb: FormBuilder,
    private retestPaymentService:RetestPaymentService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService) { }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ngOnInit(): void {
    this.getRetestList();
    this.getRetestDetails();
    this.getLicenseList();
    this.addRetestPaymentForm = this.fb.group({
      retest_type: ['',Validators.required],
      package_offers:['',Validators.required],
      retest_payment_amount: ['',Validators.required],
      no_of_times:['',Validators.required]
    });

    this.editRetestPaymentForm = this.fb.group({
      id:[''],
      retest_type: ['',Validators.required],
      retest_payment_amount: ['',Validators.required],
      package_offers:['',Validators.required],
      no_of_times:['',Validators.required]
    });
  }

  columns = [
    { name: 'Retest Type' },
    { name : 'License Class'},
    { name : 'Package Offers'},
    { name: 'Retest Amount' },
    { name : 'Retest Count'}
  ]; 

  getRetestList(){
    this.retestPaymentService.getRetestList()
    .subscribe(res=>{
      console.log("client--------",res);
      this.retestList=res['data'];
    })
  }


  // ---------------------get license list-----------------
  getLicenseList(){
    this.retestPaymentService.getLicenseClassList()
    .subscribe(res=>{
      this.licenseClassData=res['data'];
      this.licenseClassList = this.license_type.valueChanges.pipe(
        startWith(''),
        map((fruit: string | null) => fruit ? this._filterLicenseType(fruit) : this.licenseClassData.slice()));
    })
  }

  displayFnLicense(user): string {
    return user && user.license_class ? user.license_class : '';
  }

  private _filterLicenseType(name): [] {
    const filterValue = name.toLowerCase();
    return this.licenseClassData.filter(option => option.license_class.toLowerCase().includes(filterValue));
  }

  public validation_msgs = {
    'license_type': [
      { type: 'invalidAutocompleteObject', message: 'License Class not recognized. Click one of the options.' }
    ],
  }

  getRetestDetails(){
    this.retestPaymentService.getRetestDetails()
    .subscribe(res=>{
      console.log("getRetestDetails--------",res);
      this.data=res['data'];
      this.filteredData=res['data'];
    })
  }

  

  addRow(content) {
    this.addRetestPaymentForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' });
  }

  checkRetestExists(){
    if(this.addRetestPaymentForm.value.retest_type !='' && this.addRetestPaymentForm.value.package_offers != '' && this.license_type.value !=''){
      this.spinner.show();
      this.retestPaymentService.checkRetestExists(this.addRetestPaymentForm.value,this.license_type.value)
      .subscribe(res=>{
        this.spinner.hide();
          if(res['status'] == 'Exists'){
            this.toastrService.error('Already Exists!!!');
            this.addRetestPaymentForm.patchValue({
              'retest_type':'',
              'package_offers':''
            });
            this.license_type.patchValue({

            })
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
    }
  }
  

  setRetestPayment(){
    this.spinner.show();
    this.retestPaymentService.setRetestPayment(this.addRetestPaymentForm.value,this.license_type.value)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Created Successfully!!');
        this.getRetestDetails();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }

  editRow(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:'lg' });
    console.log("row====",row)
    this.editRetestPaymentForm.patchValue({
      id: row.id,
      retest_type: row.status_id,
      retest_payment_amount: row.retest_amount,
      package_offers:row.package_offers,
      no_of_times:row.no_of_retest
    });
    let licenseObj=this.licenseClassData.filter((elem)=>{return elem.id==row.license_id}); 
    this.license_type.setValue(licenseObj[0]);
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  updateRetestPayment(){
    this.spinner.show();
    this.retestPaymentService.updateRetestPayment(this.editRetestPaymentForm.value)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Updated Successfully!!');
        this.getRetestDetails();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }
  
  deleteRow(row,rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }

  deleteRetestPayment(){
    this.spinner.show();
    this.retestPaymentService.deleteRetestPayment(this.rowToDelete)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Deleted Successfully!!');
        this.getRetestDetails();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
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

}
