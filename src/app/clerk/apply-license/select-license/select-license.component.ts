import { Component, OnInit,ViewChild,ChangeDetectorRef, ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of, BehaviorSubject } from 'rxjs';
import { LanguageService } from '../../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import {ApplyLicenseService} from '../apply-license.service'
import {Router,ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';
import { FileValidator } from 'ngx-material-file-input';
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
  selector: 'app-select-license',
  templateUrl: './select-license.component.html',
  styleUrls: ['./select-license.component.sass']
})
export class SelectLicenseComponent implements OnInit {

  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');

  selectLicenseForm:FormGroup;

  existingLicenseData:any;
  nricNumberData:any;
  passportNumberData:any;
  apiURL=environment.apiUrl;
  baseLicenseData:any;

  existing_license= new FormControl('', { validators: [autocompleteObjectValidator()] });
  base_license= new FormControl('', { validators: [autocompleteObjectValidator()] });
  nric_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  passport_number= new FormControl('', { validators: [autocompleteObjectValidator()] });


  existingLicenseList: Observable<string[]>;
  baseLicenseList: Observable<string[]>;
  nricNumberList: Observable<string[]>;
  passportNumberList: Observable<string[]>;


  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');

  existing_license_front_preview;
  existing_license_rear_preview;

  licenseDetails:any=[];
  studentInfo: any;
  showGDLProcess: boolean=false;


  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,private applylicenseService:ApplyLicenseService,
    private router: Router,private route: ActivatedRoute,private spinner:NgxSpinnerService,private modalService: NgbModal) {

    this.selectLicenseForm = this.fb.group({
      existing_license: [''],
      expiry_date: [''],
      existing_license_front: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      existing_license_front_name: new FormControl(''),
      existing_license_rear:[{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      existing_license_rear_name: new FormControl(''), 
      cdl_license:['0'],
      gdlLicense:[false],
      psvLicense:[false]
    });
   }

   public validation_msgs = {
    'nric_number': [
      { type: 'invalidAutocompleteObject', message: 'NRIC Number not recognized. Click one of the options.' }
    ],
    'passport_number': [
      { type: 'invalidAutocompleteObject', message: 'Passport Number not recognized. Click one of the options.' }
    ],
    'existing_license': [
      { type: 'invalidAutocompleteObject', message: 'Existing License not recognized. Click one of the options.' }
    ],
    'base_license': [
      { type: 'invalidAutocompleteObject', message: 'Base License not recognized. Click one of the options.' }
    ],
  }

  ngOnInit(): void {

    this.getExistingLicense();
    this.getNRICNumberToApplyLicense();
    this.getPassportNumberToApplyLicense();
    this.getBaseLicenseList();
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      this.getExistingLicense();
    });
    
  }

  getNRICNumberToApplyLicense(){
    this.applylicenseService.getNRICNumberToApplyLicense()
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
    this.applylicenseService.getPassportNumberToApplyLicense()
      .subscribe(res=>{
        this.passportNumberData=res;
        this.passportNumberList = this.passport_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.passport_number)),
          map(name => (name ? this._filterPassportNumber(name) : this.passportNumberData.slice())),
        );
      })
  }

  showStudent(viewStudent){
    this.modalService.open(viewStudent, { ariaLabelledBy: 'modal-basic-title' });
  }

  onLicenseChangeGDL(event){
    if(this.selectLicenseForm.value.gdlLicense == true){
        this.selectLicenseForm.patchValue({
          'psvLicense':false
        });
    }
   
  }

  onLicenseChangePSV(event){
    if(this.selectLicenseForm.value.psvLicense == true){
      this.selectLicenseForm.patchValue({
        'gdlLicense':false
      })
    }
  }

  getExistingLicense(){
    this.applylicenseService.getExistingLicense()
      .subscribe(res=>{
        this.existingLicenseData=res;
        this.existingLicenseList = this.existing_license.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value[this.translateVal])),
          map(name => (name ? this._filterExistingLicense(name) : this.existingLicenseData.slice())),
        );
      })
  }

  getBaseLicenseList(){
    this.applylicenseService.getBaseLicenseList()
      .subscribe(res=>{
        this.baseLicenseData=res;
        this.baseLicenseList = this.base_license.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value[this.translateVal])),
          map(name => (name ? this._filterBaseLicense(name) : this.baseLicenseData.slice())),
        );
      })
  }

  clearInput(evt: any,studentId,inputType): void {
    evt.stopPropagation();
    studentId?.setValue('');
    if(inputType == 'base_license'){
      this.base_license.setValue('');
    }else{
      this.existing_license.setValue('');
      this.base_license.setValue('');
      if(this.nric_number.value){
        this.selectedNricNumber();
      }else{
        this.selectedPassportNumber();
      }
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

  displayFnExistingLicense(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  displayFnBaseLicense(user): string {
    return user && user.license_class ? user.license_class : '';
  }

  displayFnNRICNUmber(user): string {
    return user && user.nric_number ? user.nric_number : '';
  }

  displayFnPassportNumber(user): string {
    return user && user.passport_number ? user.passport_number : '';
  }

  
  private _filterExistingLicense(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.existingLicenseData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }

  private _filterBaseLicense(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.baseLicenseData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }


  private _filterNricNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.nricNumberData.filter(option => option.nric_number.toLowerCase().includes(filterValue));
  }

  private _filterPassportNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.passportNumberData.filter(option => option.passport_number.toLowerCase().includes(filterValue));
  }



  onFileChangePhoto(event,filetype) { 
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this[filetype+'_preview']=reader.result;
        this.selectLicenseForm.patchValue({
          [filetype+'_name']:file
        })
      }
    }
  }


  selectedNricNumber(){
    this.licenseDetails=[];
    this.base_license.setValue('');
    this.existing_license.setValue('');
    this.spinner.show();
    console.log('onSelectionChange selectedNricNumber', this.nric_number.value);
    if(this.nric_number.value.id){
      this.studentInfo=this.nric_number.value;
      this.passport_number.setValue('');
      console.log("req===,=====,",this.nric_number.value,this.selectLicenseForm.value.cdl_license);
      this.applylicenseService.getValidLicenseByIcNumber(this.nric_number.value,this.selectLicenseForm.value.cdl_license)
      .subscribe((res)=>{
        this.spinner.hide();
          console.log("re----nric-----------",res);
          if(res['status'] == 'Success'){
            this.licenseDetails=res['data'];
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
          
      })
    }
  }

  selectedPassportNumber(){
    this.spinner.show();
    this.licenseDetails=[];
    this.base_license.setValue('');
    this.existing_license.setValue('');
    console.log('onSelectionChange selectedPassportNumber', this.passport_number.value);
    if(this.passport_number.value.id){
      this.studentInfo=this.passport_number.value;
      this.passport_number.setValue('');
      console.log("req===,=====,",this.passport_number.value,this.selectLicenseForm.value.cdl_license);
      this.applylicenseService.getValidLicenseByIcNumber(this.passport_number.value,this.selectLicenseForm.value.cdl_license)
      .subscribe((res)=>{
        this.spinner.hide();
          console.log("re----nric-----------",res);
          if(res['status'] == 'Success'){
            this.licenseDetails=res['data'];
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
    }
  }
  
  selectedExistingLicense(event){
    console.log(this.selectLicenseForm.value.cdl_license);
    this.base_license.setValue('');
    this.licenseDetails=[];
    if(event.option.value.id){
      this.getValidLicenseByCDL(this.selectLicenseForm.value.cdl_license)
      if(event.option.value.id == 3){
        if((this.nric_number.value.nric_type == 1 || this.nric_number.value.nric_type == 2) && this.nric_number.value.age >= 21 && this.selectLicenseForm.value.cdl_license == 1){
          this.showGDLProcess=true;
        }else{
          this.showGDLProcess=false;
        }
      }else{
        this.showGDLProcess=false;
      }
    }
  }

  getValidLicenseByCDL(value){
    this.licenseDetails=[];
    this.base_license.setValue('');
    if(this.nric_number.value.id || this.passport_number.value.id){
      this.spinner.show();
      var dateOfBirth= (this.nric_number.value.id ? this.nric_number.value.date_of_birth : this.passport_number.value.date_of_birth)
      this.applylicenseService.getValidLicenseByCDL(value,dateOfBirth)
      .subscribe((res)=>{
        this.spinner.hide();
          if(res['status'] == 'Success'){
            this.licenseDetails=res['data'];
            console.log("this.selectLicenseForm.value.existing_license---",this.selectLicenseForm.value)
            if(this.existing_license.value.id == 3){
              console.log("re----nric-----------",this.selectLicenseForm.value.cdl_license);
              if((this.nric_number.value.nric_type == 1 || this.nric_number.value.nric_type == 2) && this.nric_number.value.age >= 21 && this.selectLicenseForm.value.cdl_license == 1){
                this.showGDLProcess=true;
              }else{
                this.base_license.patchValue('');
                this.selectLicenseForm.patchValue({
                  gdlLicense:false,
                  psvLicense:false
                })
                this.showGDLProcess=false;
              }
            }else{
              this.base_license.patchValue('');
                this.selectLicenseForm.patchValue({
                  gdlLicense:false,
                  psvLicense:false
                })
              this.showGDLProcess=false;
            }
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
    }else{
      this.toastrService.error("Please select NRIC or Passport Number!!")
    }
  }

  getLicenseListPerBaseLicense(){
    if(this.base_license.value){
      var dateOfBirth= (this.nric_number.value.id ? this.nric_number.value.date_of_birth : this.passport_number.value.date_of_birth)
      this.applylicenseService.getLicenseListPerBaseLicense(this.base_license.value,this.selectLicenseForm.value,this.existing_license.value,dateOfBirth)
      .subscribe((res)=>{
        if(res['status'] == 'Success'){
          this.licenseDetails=res['data'];
          console.log("this.licenseDetails----,",this.licenseDetails)
        }
        if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
      })
    }else{
      this.getValidLicenseByCDL(this.selectLicenseForm.value.cdl_license)
    }
  
  }

  setLicenseInfo(){
    console.log("setLicenseInfo=======",this.selectLicenseForm.value);
    var licenseSelected=this.licenseDetails;
    console.log("licenseSelected.filter(el=>el.selected=true)===",licenseSelected.filter(el=>el.selected==true))
    var licenseInfo=licenseSelected.filter(el=>el.selected==true);
    if((this.nric_number.value.id || this.passport_number.value.id) && this.selectLicenseForm.valid && licenseInfo.length > 0){
      var finalObj={
        'licenseInfo':licenseInfo,
        'expiry_date':this.selectLicenseForm.value.expiry_date,
        'nric_number':this.nric_number.value,
        'passport_number':this.passport_number.value,
        'existing_license':this.existing_license.value,
        'existing_license_front':this.selectLicenseForm.value.existing_license_front_name,
        'existing_license_rear':this.selectLicenseForm.value.existing_license_rear_name,
        'GDL_License':this.selectLicenseForm.value.gdlLicense,
        'PSV_License':this.selectLicenseForm.value.psvLicense,
        'cdl_license':this.selectLicenseForm.value.cdl_license
      }
      console.log("licenseInfo=======1111==",licenseInfo)
      this.applylicenseService.setSelectedLicenseInfo(finalObj);
      // localStorage.setItem('licenseData',JSON.stringify(licenseInfo));
      // localStorage.setItem('licenseObj',JSON.stringify(finalObj));
      // localStorage.setItem('nric_number',JSON.stringify(this.nric_number.value));
      // localStorage.setItem('passport_number',JSON.stringify(this.passport_number.value));
      // localStorage.setItem('existing_license',JSON.stringify(this.existing_license.value))
      this.router.navigate(['/clerk/apply/package']);
    }else{
      this.toastrService.warning("Please fill all Mandatory!!")
    }
  }

}
