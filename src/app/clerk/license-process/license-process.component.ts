import { Component, OnInit,ViewChild,ChangeDetectorRef, ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of, BehaviorSubject } from 'rxjs';
import { LanguageService } from '../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import {LicenseProcessService} from './license-process.service'
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
  selector: 'app-license-process',
  templateUrl: './license-process.component.html',
  styleUrls: ['./license-process.component.sass']
})
export class LicenseProcessComponent implements OnInit {
  
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');
  
  licenseProcessForm:FormGroup;

  nricNumberData:any;
  passportNumberData:any;
  licenseTypeData:any;

  translateVal;
  data:any;
  showEnroll:boolean=false;
  showLicenseType:boolean=false;

  
  tranNumberData: any;
  refundStatus: any;
  refundAmount: any;
  showLicense: boolean=false;
  existingLicenseData: any;
  studentInfo: any;
  LicenseData: any=[];

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,
    private licenseProcessService:LicenseProcessService,
    private router: Router,private route: ActivatedRoute,
    private spinner:NgxSpinnerService,private modalService: NgbModal) {
      this.licenseProcessForm = this.fb.group({
        license_type: ['', Validators.required],
        license_no:['', Validators.required],
        expiry_date:['', Validators.required],
        renewal_amount:['', Validators.required]
      })
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
    this.licenseProcessService.getNRICNumberToApplyRefund()
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
    this.licenseProcessService.getPassportNumberToApplyRefund()
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
    }else if(inputType == 'enrollment_no'){
        this.license_type.setValue('');
        this.LicenseData=[];
    }else if(inputType == 'license_type'){
        this.LicenseData=[];
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
    console.log("event.option.value.id===",event.option.value.id);
    this.spinner.show();
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.passport_number.setValue('');
      this.tranNumberData=[];
      this.enrollment_no.setValue('');
      this.license_type.setValue('')
      this.data=[];
      this.licenseProcessService.getEnrollmentNumberList(event.option.value.id)
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
            this.toastrService.error("Session Expired!!!");
            this.router.navigate(['/authentication/signin']);
          }
       
      })
    }
  }

  // ----------------On passport Number change---------------------------------

  selectedPassportNumber(event){
    console.log("event.option.value.id===",event.option.value.id);
    this.spinner.show();
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.nric_number.setValue('');
      this.tranNumberData=[];
      this.enrollment_no.setValue('');
      this.license_type.setValue('');
      this.data=[];
      this.licenseProcessService.getEnrollmentNumberList(event.option.value.id)
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
    this.licenseProcessService.getLicenseListPerEnroll(this.enrollment_no.value.student_id,event.option.value.id)
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
              this.checkForLicenseProcess();
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

  // ------------------------view student details--------------------------

  showStudent(viewStudent){
    this.modalService.open(viewStudent, { ariaLabelledBy: 'modal-basic-title' });
  }



  checkForLicenseProcess(){
    console.log("license_type=========",this.license_type);
    this.spinner.show();
    this.LicenseData=[];
    this.existingLicenseData=[];
    this.licenseProcessService.checkForLicenseProcess(this.license_type.value)
    .subscribe(res=>{
      this.spinner.hide();
      console.log("new date-------",new Date())
      if(res['status'] == 'Success'){
        this.existingLicenseData=res['data'];
        this.existingLicenseData[0].package_name=this.existingLicenseData[0]['package_'+this.translateVal];
          this.existingLicenseData[0].package_description=this.existingLicenseData[0]['package_desc_'+this.translateVal];
          this.LicenseData=this.existingLicenseData[0].license_class;
        // for(let i=0;i<this.existingLicenseData[0].licenseData.length;i++){
        //   this.LicenseData.push(this.existingLicenseData[0].licenseData[i].license_class + ' - ' + this.existingLicenseData[0].licenseData[i]['license_desc_'+this.translateVal])
        // }
        console.log("this.existingLicenseData====",this.existingLicenseData)
          if((this.license_type.value.status_id == 5 && this.license_type.value.result == 'Pass') || (this.license_type.value.status_id == 6 && this.license_type.value.result == 'Pass')){
            this.showLicense=true;
            this.licenseProcessForm.patchValue({
              license_type:'LDL',
              license_no:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].LDL_license_no : ''),
              expiry_date:(this.existingLicenseData.length > 0 ? (this.existingLicenseData[0].LDL_expiry_date ? new Date(this.existingLicenseData[0].LDL_expiry_date) : new Date()) : new Date()),
              renewal_amount:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].LDL_renewal_amount : '')
            })
        }else if((this.license_type.value.status_id == 13 && this.license_type.value.result == 'Pass') || (this.license_type.value.status_id == 14 && this.license_type.value.result == 'Pass')){
            this.showLicense=true;
            this.licenseProcessForm.patchValue({
              license_type:'PDL',
              license_no:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_license_no : ''),
              expiry_date:(this.existingLicenseData.length > 0 ?(this.existingLicenseData[0].PDL_expiry_date ? new Date(this.existingLicenseData[0].PDL_expiry_date): new Date()) : new Date()),
              renewal_amount:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_renewal_amount : '')
            })
        }else if((this.license_type.value.status_id == 21 && this.license_type.value.result == 'Pass') || (this.license_type.value.status_id == 22 && this.license_type.value.result == 'Pass')|| (this.license_type.value.status_id == 24 && this.license_type.value.result == 'Pass')|| (this.license_type.value.status_id == 25 && this.license_type.value.result == 'Pass')){
          this.showLicense=true;
          this.licenseProcessForm.patchValue({
            license_type:'GDL',
            license_no:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_license_no : ''),
            expiry_date:(this.existingLicenseData.length > 0 ? (this.existingLicenseData[0].PDL_expiry_date ? new Date(this.existingLicenseData[0].PDL_expiry_date) : new Date()) : new Date()),
            renewal_amount:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_renewal_amount : '')
          })
      }else if((this.license_type.value.status_id == 29 && this.license_type.value.result == 'Pass') || (this.license_type.value.status_id == 30 && this.license_type.value.result == 'Pass')|| (this.license_type.value.status_id == 32 && this.license_type.value.result == 'Pass')|| (this.license_type.value.status_id == 33 && this.license_type.value.result == 'Pass')){
        this.showLicense=true;
        this.licenseProcessForm.patchValue({
          license_type:'PSV',
          license_no:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_license_no : ''),
          expiry_date:(this.existingLicenseData.length > 0 ? (this.existingLicenseData[0].PDL_expiry_date ? new Date(this.existingLicenseData[0].PDL_expiry_date) : new Date()) : new Date()),
          renewal_amount:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_renewal_amount : '')
        })
    }else{
            this.showLicense=false;
            this.toastrService.warning('Not Applicable')
        }
        console.log("this.licenseProcessForm-----------",this.licenseProcessForm.value)
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
    })
    
  }

  setLicenseProcessing(){
    this.spinner.show();
    console.log("this.license_type.value-----",this.license_type.value)
    this.licenseProcessService.setLicenseProcessing(this.license_type.value,this.licenseProcessForm.value)
    .subscribe((res)=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success("Updated Successfully");
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
       
    })
  }




}
