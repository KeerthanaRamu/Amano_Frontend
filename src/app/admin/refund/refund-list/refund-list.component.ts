import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RefundService } from '../refund.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-refund-list',
  templateUrl: './refund-list.component.html',
  styleUrls: ['./refund-list.component.sass']
})
export class RefundListComponent implements OnInit {

  data=[];
  filteredData = [];
  addRefundForm:FormGroup;
  editRefundForm:FormGroup;
  rowToDelete: any;
  refundList:any;
  licenseClassData:any;

  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  
  licenseClassList: Observable<string[]>;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private refundService:RefundService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService) { }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ngOnInit(): void {
    this.getRefundList();
    this.getRefundDetails();
    this.getLicenseList();
    this.addRefundForm = this.fb.group({
      refund_type: ['',Validators.required],
      package_offers:['',Validators.required],
      refund_amount: ['',Validators.required],
      refund_mode: ['',Validators.required],
    });

    this.editRefundForm = this.fb.group({
      id:[''],
      refund_type: ['',Validators.required],
      package_offers:['',Validators.required],
      refund_amount: ['',Validators.required],
      refund_mode: ['',Validators.required],
    });
  }

  columns = [
    { name: 'Refund Type' },
    { name: 'License' },
    { name: 'Package Offers' },
    { name: 'Refund Amount' },
    { name: 'Refund Mode' }
  ]; 

   // ---------------------get license list-----------------
   getLicenseList(){
    this.refundService.getLicenseClassList()
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


  getRefundList(){
    this.refundService.getRefundList()
    .subscribe(res=>{
      console.log("client--------",res);
      this.refundList=res['data'];
    })
  }


  getRefundDetails(){
    this.refundService.getRefundDetails()
    .subscribe(res=>{
      console.log("getRefundDetails--------",res);
      this.data=res['data'];
      this.filteredData=res['data'];
    })
  }

  

  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' });
  }

  checkRefundExists(){
    if(this.addRefundForm.value.refund_type !='' && this.addRefundForm.value.package_offers != '' && this.license_type.value !=''){
      this.refundService.checkRefundExists(this.addRefundForm.value,this.license_type.value.id)
      .subscribe(res=>{
          if(res['status'] == 'Exists'){
            this.toastrService.error('Already Exists!!!');
            this.addRefundForm.patchValue({
              'refund_type':'',
              'package_offers':''
            });
            this.license_type.patchValue({

            })
          }
      })
    }
  }
  

  setRefundDetails(){
    this.spinner.show();
    this.refundService.setRefundDetails(this.addRefundForm.value,this.license_type.value.id)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.addRefundForm.reset();
        this.toastrService.success('Created Successfully!!');
        this.getRefundDetails();
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
    this.editRefundForm.patchValue({
      id: row.id,
      refund_type: row.status_id,
      package_offers:row.package_offers,
      refund_amount: row.refund_amount,
      refund_mode: row.refund_mode,
    });  
    let licenseObj=this.licenseClassData.filter((elem)=>{return elem.id==row.license_id}); 
    this.license_type.setValue(licenseObj[0]);
  }

  

  updateRefundDetails(){
    this.spinner.show();
    this.refundService.updateRefundDetails(this.editRefundForm.value,this.license_type.value.id)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Updated Successfully!!');
        this.getRefundDetails();
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

  deleteRefund(){
    this.spinner.show();
    this.refundService.deleteRefund(this.rowToDelete,this.license_type.value.id)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Deleted Successfully!!');
        this.getRefundDetails();
        this.modalService.dismissAll()
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
