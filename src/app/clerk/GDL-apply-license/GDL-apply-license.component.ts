import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of } from 'rxjs';
import { LanguageService } from '../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import {GdlApplyLicenseService} from './GDL-apply-license.service'
import {Router,ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-GDL-apply-license',
  templateUrl: './GDL-apply-license.component.html',
  styleUrls: ['./GDL-apply-license.component.sass']
})
export class GdlApplyLicenseComponent implements OnInit {

  licenseProcessForm:FormGroup;

  nricNumberData:any;
  passportNumberData:any;
  translateVal;
  data:any;
  showEnroll:boolean=false;

  
  tranNumberData: any;
  refundStatus: any;
  refundAmount: any;
  showLicense: boolean=false;
  existingLicenseData: any;
  studentInfo: any;
  LicenseData: any=[];

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,
    private gdlApplyLicenseService:GdlApplyLicenseService,
    private router: Router,private route: ActivatedRoute,
    private spinner:NgxSpinnerService,private modalService: NgbModal) {
      this.licenseProcessForm = this.fb.group({
        license_type: ['', Validators.required],
        license_no:['', Validators.required],
        expiry_date:['', Validators.required],
        renewal_amount:['']
      })
    }

  nric_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  passport_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  enrollment_no= new FormControl('', { validators: [autocompleteObjectValidator()] });


  nricNumberList: Observable<string[]>;
  passportNumberList: Observable<string[]>;
  tranNumberList: Observable<string[]>;

    public validation_msgs = {
      'nric_number': [
        { type: 'invalidAutocompleteObject', message: 'NRIC Number not recognized. Click one of the options.' }
      ],
      'passport_number': [
        { type: 'invalidAutocompleteObject', message: 'Passport Number not recognized. Click one of the options.' }
      ],
      'enrollment_no': [
        { type: 'invalidAutocompleteObject', message: 'Transaction Number not recognized. Click one of the options.' }
      ]
    }

  ngOnInit(): void {

    this.getNRICNumber();
    this.getPassportNumber();
    
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
    });

  }

  getNRICNumber(){
    this.gdlApplyLicenseService.getNRICNumberForGDLProcess()
      .subscribe(res=>{
        console.log("res====nric----",res)
        this.nricNumberData=res;
        this.nricNumberList = this.nric_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.nric_number)),
          map(name => (name ? this._filterNricNumber(name) : this.nricNumberData.slice())),
        );
      })
  }

  getPassportNumber(){
    this.gdlApplyLicenseService.getPassportNumberForGDLProcess()
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
  

  selectedNricNumber(event){
    console.log("event.option.value.id===",event.option.value.id);
    this.spinner.show();
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.passport_number.setValue('');
      this.enrollment_no.setValue('');
      this.data=[];
      this.gdlApplyLicenseService.getEnrollmentNumberListForGDL(event.option.value.id)
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

  selectedPassportNumber(event){
    console.log("event.option.value.id===",event.option.value.id);
    this.spinner.show();
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.nric_number.setValue('');
      this.enrollment_no.setValue('');
      this.data=[];
      this.gdlApplyLicenseService.getEnrollmentNumberListForGDL(event.option.value.id)
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

  // showStudent(viewStudent){
  //   this.modalService.open(viewStudent, { ariaLabelledBy: 'modal-basic-title' });
  // }

  // checkForLicenseProcess(event){
  //   console.log("enrollment_no=========",this.enrollment_no);
  //   this.spinner.show();
  //   this.LicenseData=[];
  //   this.licenseProcessService.checkForLicenseProcess(this.enrollment_no.value)
  //   .subscribe(res=>{
  //     this.spinner.hide();
  //     if(res['status'] == 'Success'){
  //       this.existingLicenseData=res['data'];
  //       this.existingLicenseData[0].package_name=this.existingLicenseData[0]['package_'+this.translateVal];
  //         this.existingLicenseData[0].package_description=this.existingLicenseData[0]['package_desc_'+this.translateVal];
  //       for(let i=0;i<this.existingLicenseData[0].licenseData.length;i++){
  //         this.LicenseData.push(this.existingLicenseData[0].licenseData[i].license_class + ' - ' + this.existingLicenseData[0].licenseData[i]['license_desc_'+this.translateVal])
  //       }
  //       console.log("this.existingLicenseData====",this.existingLicenseData)
  //         if((this.enrollment_no.value.status_id == 5 && this.enrollment_no.value.result == 'Pass') || (this.enrollment_no.value.status_id == 6 && this.enrollment_no.value.result == 'Pass')){
  //           this.showLicense=true;
  //           this.licenseProcessForm.patchValue({
  //             license_type:'LDL',
  //             license_no:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].LDL_license_no : ''),
  //             expiry_date:(this.existingLicenseData.length > 0 ? new Date(this.existingLicenseData[0].LDL_expiry_date) : ''),
  //             renewal_amount:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].LDL_renewal_amount : '')
  //           })
  //       }else if((this.enrollment_no.value.status_id == 13 && this.enrollment_no.value.result == 'Pass') || (this.enrollment_no.value.status_id == 14 && this.enrollment_no.value.result == 'Pass')){
  //           this.showLicense=true;
  //           this.licenseProcessForm.patchValue({
  //             license_type:'PDL',
  //             license_no:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_license_no : ''),
  //             expiry_date:(this.existingLicenseData.length > 0 ? new Date(this.existingLicenseData[0].PDL_expiry_date) : ''),
  //             renewal_amount:(this.existingLicenseData.length > 0 ? this.existingLicenseData[0].PDL_renewal_amount : '')
  //           })
  //       }else{
  //           this.showLicense=false;
  //           this.toastrService.warning('Not Applicable')
  //       }
  //     }
  //     if(res['status'] == 'Session Expired'){
  //       this.toastrService.error("Session Expired!!!")
  //       this.router.navigate(['/authentication/signin']);
  //     }
  //   })
    
  // }

  // setLicenseProcessing(){
  //   this.spinner.show();
  //   console.log("this.enrollment_no.value-----",this.enrollment_no.value)
  //   this.licenseProcessService.setLicenseProcessing(this.enrollment_no.value,this.licenseProcessForm.value)
  //   .subscribe((res)=>{
  //     this.spinner.hide();
  //     if(res['status'] == 'Success'){
  //       this.toastrService.success("Updated Successfully");
  //     }
  //     if(res['status'] == 'Session Expired'){
  //       this.toastrService.error("Session Expired!!!")
  //       this.router.navigate(['/authentication/signin']);
  //     }
       
  //   })
  // }




}
