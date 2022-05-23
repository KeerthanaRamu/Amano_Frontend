import { Component, OnInit,ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith, BehaviorSubject} from 'rxjs';
import { LanguageService } from '../../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import {RefundProcessService} from '../refund-process.service'
import {Router,ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.sass']
})
export class RefundComponent implements OnInit {

  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;
  selectProfileForm:FormGroup;

  nricNumberData:any;
  passportNumberData:any;
  translateVal;
  data:any;
  showEnroll:boolean=false;
  remarks=new FormControl('');
  licenseTypeData:any;
  showLicenseType:boolean=false;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');

  columns = [
    { name: 'Student Name' },
    { name: 'Transaction Number' },
    { name: 'Package' },
    {name: 'Package Type'},
    {name: 'Package Amount'},
    {name: 'Payment Status'},
    {name: 'Amount Paid'},
    {name: 'Status'},
    {name: 'Refund Amount'},
  ]; 
  tranNumberData: any;
  refundStatus: any;
  refundAmount: any;
  studentInfo: any;
  packInfo: any;
  LicenseData: any=[];

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,
    private refundProcessService:RefundProcessService,
    private router: Router,private route: ActivatedRoute,
    private spinner:NgxSpinnerService,private modalService: NgbModal) {
     
    }

  nric_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  passport_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  enrollment_no= new FormControl('', { validators: [autocompleteObjectValidator()] });
  license_type= new FormControl('', { validators: [autocompleteObjectValidator()] });


  nricNumberList: Observable<string[]>;
  passportNumberList: Observable<string[]>;
  tranNumberList: Observable<string[]>;
  licenseTypeList: Observable<string[]>;


    public validation_msgs = {
      'nric_number': [
        { type: 'invalidAutocompleteObject', message: 'NRIC Number not recognized. Click one of the options.' }
      ],
      'passport_number': [
        { type: 'invalidAutocompleteObject', message: 'Passport Number not recognized. Click one of the options.' }
      ],
      'enrollment_no': [
        { type: 'invalidAutocompleteObject', message: 'Transaction Number not recognized. Click one of the options.' }
      ],
      'license_type': [
        { type: 'invalidAutocompleteObject', message: 'License Class not recognized. Click one of the options.' }
      ]
    }

  ngOnInit(): void {

    this.getNRICNumberToApplyLicense();
    this.getPassportNumberToApplyLicense();
    
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
    });

  }

  getNRICNumberToApplyLicense(){
    this.refundProcessService.getNRICNumberToApplyRefund()
      .subscribe(res=>{
        this.nricNumberData=res;
        this.nricNumberList = this.nric_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.nric_number)),
          map(name => (name ? this._filterNricNumber(name) : this.nricNumberData.slice())),
        );
      })
  }

  getPassportNumberToApplyLicense(){
    this.refundProcessService.getPassportNumberToApplyRefund()
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

  displayFnTransactionNumber(user): string {
    console.log("user===",user)
    return user && user.enrollment_no ? user.enrollment_no : '';
  }

  displayFnLicenseClass(user): string {
    console.log("user===",user)
    return user && user.license_class ? user.license_class : '';
  }

  private _filterNricNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.nricNumberData.filter(option => option.nric_number.toLowerCase().includes(filterValue));
  }

  private _filterPassportNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.passportNumberData.filter(option => option.passport_number.toLowerCase().includes(filterValue));
  }

  private _filterTranNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.tranNumberData.filter(option => option.enrollment_no.toLowerCase().includes(filterValue));
  }
  private _filterLicenseClass(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.licenseTypeData.filter(option => option.license_type.toLowerCase().includes(filterValue));
  }

  clearInput(evt: any,studentId,inputType): void {
    evt.stopPropagation();
    console.log("inputType====",inputType)
    studentId?.setValue('');
    if(inputType == 'nric_number' || inputType == 'passport_number'){
        this.enrollment_no.setValue('');
        this.license_type.setValue('');
        this.LicenseData=[];
        this.data=[];
        this.refundAmount=0;
    }else if(inputType == 'enrollment_no'){
        this.license_type.setValue('');
        this.LicenseData=[];
        this.data=[];
        this.refundAmount=0;
    }else if(inputType == 'license_type'){
        this.LicenseData=[];
        this.data=[];
        this.refundAmount=0;
    }
    this.licenceInput?.nativeElement.focus();
  }


  openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
   evt.stopPropagation();
    if(trigger.panelOpen)
      trigger.closePanel();
    else
      trigger.openPanel();
  }

  // ----------------------On nric number change-----------------------------


  selectedNricNumber(event){
    this.spinner.show();
    console.log("event.option.value.id===",event.option.value.id);
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.tranNumberData=[];
      this.passport_number.setValue('');
      this.enrollment_no.setValue('');
      this.data=[];
      this.showLicenseType=false;
      this.refundProcessService.getEnrollmentNumberList(event.option.value.id)
      .subscribe((res)=>{
        this.spinner.hide();
          console.log("re----nric-----------",res);
          if(res['status'] == 'Success'){
            this.tranNumberData=res['data'];
            if(res['data'].length >0){
              this.showEnroll=true;
              this.tranNumberList = this.enrollment_no.valueChanges.pipe(
                startWith(''),
                map(value => (typeof value === 'string' ? value : value.enrollment_no)),
                map(name => (name ? this._filterTranNumber(name) : this.tranNumberData.slice())),
              );
            }else{
              this.showEnroll=false;
              this.toastrService.warning("No Enrollment Number Available")
            }
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
    }
  }

    // ----------------On passport Number change---------------------------------


  selectedPassportNumber(event){
    this.spinner.show();
    console.log("event.option.value.id===",event.option.value.id);
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.nric_number.setValue('');
      this.enrollment_no.setValue('');
      this.tranNumberData=[];
      this.data=[];
      this.showLicenseType=false;
      this.refundProcessService.getEnrollmentNumberList(event.option.value.id)
      .subscribe((res)=>{
        this.spinner.hide();
          console.log("re----nric-----------",res);
          if(res['status'] == 'Success'){
            this.tranNumberData=res['data'];
            if(res['data'].length >0){
              this.showEnroll=true;
              this.tranNumberList = this.enrollment_no.valueChanges.pipe(
                startWith(''),
                map(value => (typeof value === 'string' ? value : value.enrollment_no)),
                map(name => (name ? this._filterTranNumber(name) : this.tranNumberData.slice())),
              );
            }else{
              this.showEnroll=false;
              this.toastrService.warning("No Enrollment Number Available")
            }
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
    }
  }


  // -------------------------------------------on Change enrollment no-----------------

  getLicenseListPerEnroll(event){
    console.log("----------",this.enrollment_no.value);
    this.spinner.show();
    this.showLicenseType=false;
    this.showEnroll=false;
    this.LicenseData=[];
    this.licenseTypeData=[];
    this.license_type.patchValue({});
    this.refundProcessService.getLicenseListPerEnroll(this.enrollment_no.value.student_id,event.option.value.id)
      .subscribe((res)=>{
        this.showLicenseType=true;
        this.spinner.hide();
        if(res['status'] == 'Success'){
          if(res['licenseData'].length > 0){
            this.showEnroll=true;
            this.licenseTypeData=res['licenseData'];
            this.licenseTypeList = this.license_type.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.enrollment_no)),
              map(name => (name ? this._filterLicenseClass(name) : this.licenseTypeData.slice())),
            );
            if(res['licenseData'].length == 1){
              this.license_type.patchValue(res['licenseData'][0]);
              this.getRefundDetails();
            }
          }else{
            this.showEnroll=false;
            this.showLicenseType=false;
            this.toastrService.warning("No License Class Available")
          }
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
    })
  }

// -------------------get refund details--------------------------------------

  getRefundDetails(){
    console.log("this.license_type.value=11==",this.license_type.value);
    this.data=[];
    this.refundProcessService.getRefundDetailsForStudents(this.license_type.value)
    .subscribe((res)=>{
        console.log("re----nric-----------",res);
        if(res['status'] == 'Success'){
          if(res['data'].length > 0){
            this.data=res['data'];
            let sumOfPaid=0;
            for(let i=0;i<this.data.length;i++){
              sumOfPaid=sumOfPaid+this.data[i].amountPaid;
            }
            let refundAmount=res['refundAmount'];
            if(refundAmount > 0){
              if(sumOfPaid >= refundAmount){
                this.refundStatus=this.data[0].status;
                this.refundAmount=sumOfPaid - refundAmount;
              }else{
                this.refundStatus=this.data[0].status;
                this.toastrService.warning("Refund Amount is greater than Student paid Amount!!");
              }
            }else{
              this.toastrService.warning("Refund Amount is not defined!!");
            }
          
            
          }else{
            this.toastrService.warning("Refund Not Applicable!!");
          }
        }
        if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
        
    })
  }

  // ------------------------confirm refund details-----------------------------------------

  setRefundConfirmation(){
    console.log("this.enrollment_no.value===",this.license_type.value);
    this.refundProcessService.setRefundConfirmation(this.license_type.value,this.refundAmount,this.remarks.value)
    .subscribe((res)=>{
      if(res['status'] == 'Success'){
          this.refundAmount=0;
          this.toastrService.success("Refund done Successfully");
          this.data=[];
          this.refundStatus='';
          this.refundStatus='';
      }
      if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
      }
    })
  }


// ------------show student info--------------------------------------

  showStudent(viewStudent){
    this.refundProcessService.getStudPackageInfo(this.license_type.value)
    .subscribe((res)=>{
      this.packInfo=res['data'][0];
      this.packInfo.package_name=this.packInfo['package_'+this.translateVal];
        this.packInfo.package_description=this.packInfo['package_desc_'+this.translateVal];
        this.LicenseData=this.packInfo.license_class + ' - ' + this.packInfo['license_desc_'+this.translateVal]
      this.modalService.open(viewStudent, { ariaLabelledBy: 'modal-basic-title' });
    })
  }




}
