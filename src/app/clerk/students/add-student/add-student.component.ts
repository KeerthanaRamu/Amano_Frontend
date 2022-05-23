import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of } from 'rxjs';
import { StudentService } from '../students.service';
import { LanguageService } from '../../../core/service/language.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import {Router,ActivatedRoute} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { FileValidator } from 'ngx-material-file-input';
import { StepperOrientation } from '@angular/material/stepper';


function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})



export class AddStudentComponent  implements OnInit{

  isLinear = false;
  clientCode;
  personalDetailsForm: FormGroup;
  preferenceForm: FormGroup;
  documentForm:FormGroup;
  raceData: any;
  nricTypeData:any;
  nationalityData:any;
  postalCodeData:any;
  preferenceData:any;
  placeBirthData:any;
  race = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });
  nricType = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  nationality= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });  
  postalCode= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });
  preference=new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });
  placeBirth=new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });

  raceList: Observable<string[]>;
  nricTypeList: Observable<string[]>;
  nationalityList: Observable<string[]>;
  postalCodeList: Observable<string[]>;
  preferenceList: Observable<string[]>;
  placeBirthList: Observable<string[]>;
  resultOptions: Observable<any>;


  photo_preview;
  nric_front_preview;
  nric_rear_preview;
  passport_front_preview;
  work_permit_preview;
  confirmDocumentData;
  confirmPersonalData;
  confirmPreferenceData;
  stepperOrientation: Observable<StepperOrientation>;

  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  
  hide = true;
  showOtherRace=false;

  public validation_msgs = {
    'race': [
      { type: 'invalidAutocompleteObject', message: 'Race not recognized. Click one of the options.' },
      { type: 'required' }
    ],
    'nricType': [
      { type: 'invalidAutocompleteObject', message: 'NRIC Type not recognized. Click one of the options.' },
      { type: 'required', message: '.' }
    ],
    'nationality': [
      { type: 'invalidAutocompleteObject', message: 'Nationality not recognized. Click one of the options.' },
      { type: 'required', message: 'Nationality is required.' }
    ],
    'postalCode': [
      { type: 'invalidAutocompleteObject', message: 'Postal Code not recognized. Click one of the options.' },
      { type: 'required', message: 'Postal Code is required.' }
    ],
   
    'preference': [
      { type: 'invalidAutocompleteObject', message: 'Prefered Language not recognized. Click one of the options.' },
      { type: 'required', message: 'Prefered Language is required.' }
    ],
    'placeBirth': [
      { type: 'invalidAutocompleteObject', message: 'Place Of Birth not recognized. Click one of the options.' },
      { type: 'required', message: 'Place Of Birth is required.' }
    ]
  }
  

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private studentService:StudentService,private languageService:LanguageService,public dialog: MatDialog,
    private modalService: NgbModal,private toastrService: ToastrService,private router:Router,
    private spinner: NgxSpinnerService,private breakpointObserver: BreakpointObserver) {
    this.personalDetailsForm = this.fb.group({
      name: ['',[Validators.required]],
      nric_number: [''],
      passport_number: [''], 
      gender:['', Validators.required],
      ic_address: ['', Validators.required],
      address1: [''],
      address2: [''], 
      city: ['', Validators.required],
      state: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      mobile_number: ['', Validators.required],
      other_race: [''],
      other_placebirth:[''],
      date_of_birth: ['', Validators.required],
      nationality_code:['']
    });
    this.preferenceForm = this.fb.group({
      emergency_name: [''],
      emergency_number: [''],
      user_name: ['', Validators.required],
      password: ['', Validators.required
                     ],
      expiry_date:['']
    });
    this.documentForm= this.fb.group({
      photo: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      photo_name: new FormControl('',Validators.required),
      nric_front: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      nric_front_name: new FormControl(''),
      nric_rear: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      nric_rear_name: new FormControl(''),
      passport_front: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      passport_front_name: new FormControl(''),
      work_permit: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      work_permit_name: new FormControl(''),
     
    });
  }

  ngOnInit(): void {
      this.getNRICTypeList();
      this.getRaceList();
      this.getNationalityList();
      this.getPreferenceList();
      this.getPostalCode();
      this.getPlaceBirth();

     

      this.languageService.languageChanged.subscribe(value => {
        this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
        this.getNRICTypeList();
        this.getRaceList();
        this.getNationalityList();
        this.getPreferenceList();
        this.getPlaceBirth();
      })

      if(localStorage.PersonalDetails){
        var localPersonalData=JSON.parse(localStorage.PersonalDetails);
        this.personalDetailsForm.patchValue({
          name: localPersonalData.name,
          nric_number: localPersonalData.nric_number,
          passport_number: localPersonalData.passport_number, 
          gender:localPersonalData.gender,
          ic_address:localPersonalData.ic_address,
          address1: localPersonalData.address1,
          address2: localPersonalData.address2,
          city: localPersonalData.city,
          state: localPersonalData.state,
          email_address: localPersonalData.email_address,
          mobile_number: localPersonalData.mobile_number,
          other_race: localPersonalData.other_race,
          date_of_birth: localPersonalData.date_of_birth,
        })

        this.stepperOrientation = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
      
  
      }

      if(localStorage.race){
       this.race.setValue(JSON.parse(localStorage.race));
      }

      if(localStorage.nricType){
        this.nricType.setValue(JSON.parse(localStorage.nricType));
       }

       if(localStorage.nationality){
        this.nationality.setValue(JSON.parse(localStorage.nationality));
       }

       if(localStorage.placeBirth){
        this.placeBirth.setValue(JSON.parse(localStorage.placeBirth));
       }

       if(localStorage.postalCode){
        this.postalCode.setValue(JSON.parse(localStorage.postalCode));
       }

       if(localStorage.PreferenceDetails){
        this.confirmPreferenceData=JSON.parse(localStorage.PreferenceDetails)
        var localPreferenceData=JSON.parse(localStorage.PreferenceDetails)
        this.preferenceForm.patchValue({
          emergency_name: localPreferenceData.emergency_name,
          emergency_number: localPreferenceData.emergency_number,
          user_name: localPreferenceData.user_name,
          password: localPreferenceData.password,
          expiry_date:localPreferenceData.expiry_date
        })
       }

       if(localStorage.preference){
        this.preference.setValue(JSON.parse(localStorage.preference));
       }
       
      


       console.log("confirmDocumentData===",this.confirmDocumentData)
     
  }

  get validate() {
    return this.personalDetailsForm.controls;
  }

  getRaceList(){   
    this.raceData=[];
    this.studentService.getRaceList()
      .subscribe(res=>{
        this.raceData=res;
        console.log("this.raceData====",this.raceData);
        this.raceList = this.race.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value[this.translateVal])),
          map(name => (name ? this._filterRace(name) : this.raceData.slice())),
        );
      })
  }

  getNRICTypeList(){
    this.nricTypeData=[]
    this.studentService.getNRICTypeList()
      .subscribe(res=>{
        this.nricTypeData=res;
        this.nricTypeList = this.nricType.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value[this.translateVal])),
          map(name => (name ? this._filterNRIC(name) : this.nricTypeData.slice())),
        );
      })
  }

  getPostalCode(){
    this.nricTypeData=[]
    this.studentService.getPostalCode()
      .subscribe(res=>{
        this.postalCodeData=res;
        this.postalCodeList = this.postalCode.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.postal_code)),
          map(name => (name ? this._filterPostalCode(name) : this.postalCodeData.slice())),
        );
      })
  }

  getNationalityList(){
    this.studentService.getNationalityList()
      .subscribe(res=>{
        this.nationalityData=res;
        this.nationalityList = this.nationality.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.country_name)),
          map(name => (name ? this._filterNationality(name) : this.nationalityData.slice())),
        );
      })
  }

 

  getPreferenceList(){
    this.studentService.getPreferenceList()
      .subscribe(res=>{
        this.preferenceData=res;
        this.preferenceList = this.preference.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value[this.translateVal])),
          map(name => (name ? this._filterPreference(name) : this.preferenceData.slice())),
        );
      })
  }

  
  getPlaceBirth(){
    this.placeBirthData=[]
    this.studentService.getPlaceBirth()
      .subscribe(res=>{
        this.placeBirthData=res;
        this.placeBirthList = this.placeBirth.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value[this.translateVal])),
          map(name => (name ? this._filterPlaceBirth(name) : this.placeBirthData.slice())),
        );
      })
  }

  displayFn(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  displayFnRace(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  displayFnNationality(user): string {
    return user && user.country_name ? user.country_name : '';
  }

  displayFnPostalCode(user) {
    return user && user.postal_code ? user.postal_code : '';
  }

 

  displayFnPreference(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  displayFnPlaceBirth(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  private _filterRace(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.raceData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }

  private _filterNRIC(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.nricTypeData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }

  private _filterNationality(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.nationalityData.filter(option => option.country_name.toLowerCase().includes(filterValue));
  }

  
  private _filterPostalCode(name: string): [] {
    console.log("name---------",name)
    const filterValue = name;
    return this.postalCodeData.filter(option => JSON.stringify(option.postal_code).includes(filterValue));
  }

  private _filterPreference(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.preferenceData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }

  
  private _filterPlaceBirth(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.placeBirthData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }


  onSelectionChange(event){
    console.log('onSelectionChange called', event.option.value);
    if(event.option.value.id === 4){
      this.showOtherRace=true;
    }else{
      this.showOtherRace=false;
    }
  }

  getICTypeChange(){  
    console.log("---",this.personalDetailsForm.value.nric_number,this.nricType);
    const restrictList=[1,2,6]
    // this.personalDetailsForm.value.nric_number.charAt(this.personalDetailsForm.value.nric_number.length-1)
    if(restrictList.indexOf(this.nricType.value.id) >= 0){
      if((this.personalDetailsForm.value.nric_number.charAt(this.personalDetailsForm.value.nric_number.length-1)) % 2 == 0){
        this.personalDetailsForm.patchValue({gender:"Female"})
      }else{
        this.personalDetailsForm.patchValue({gender:"Male"})
      }
    }else{
      this.personalDetailsForm.patchValue({gender:""})
    }
    var a = [2, 3, 4]
    if(a.includes(this.nricType.value.id)){
      var nationalityObj=this.nationalityData.filter((elem)=>{return elem.id==135});
      this.nationality.setValue(nationalityObj[0]);
    }else{
      this.nationality.setValue('');
    }
  }

  getNRICNumberChange(){
    console.log("---",(this.personalDetailsForm.value.nric_number).substr(2,2));
    this.studentService.checkNRICExistence(this.personalDetailsForm.value.nric_number)
    .subscribe(res=>{
      if(res['status'] == 'New'){
        console.log((this.personalDetailsForm.value.nric_number).substr(2,2)+"/"+(this.personalDetailsForm.value.nric_number).substr(4,2)+"/"+(this.personalDetailsForm.value.nric_number).substr(0,2))
        this.personalDetailsForm.patchValue({date_of_birth:new Date((this.personalDetailsForm.value.nric_number).substr(2,2)+"/"+(this.personalDetailsForm.value.nric_number).substr(4,2)+"/"+(this.personalDetailsForm.value.nric_number).substr(0,2))})
        const restrictList=[1,2,6]
        // this.personalDetailsForm.value.nric_number.charAt(this.personalDetailsForm.value.nric_number.length-1)
        if(restrictList.indexOf(this.nricType.value.id) >= 0){
          if((this.personalDetailsForm.value.nric_number.charAt(this.personalDetailsForm.value.nric_number.length-1)) % 2 == 0){
            this.personalDetailsForm.patchValue({gender:"Female"})
          }else{
            this.personalDetailsForm.patchValue({gender:"Male"})
          }
        }else{
          this.personalDetailsForm.patchValue({gender:""})
        }
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error("NRIC Number Already Exists");
        this.personalDetailsForm.value.nric_number='';
      }
    
    })
   
  }

  getPassportNumberChange(){
    this.studentService.checkPassportExistence(this.personalDetailsForm.value.passport_number)
    .subscribe(res=>{
      if(res['status'] == 'New'){
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error("Passport Number Already Exists");
        this.personalDetailsForm.value.passport_number='';
      }
    })
  }

  getPostalCodeChange(){
    console.log("postalCode===",this.postalCode.value);
    this.personalDetailsForm.patchValue({
      city:this.postalCode.value.city,
      state:this.postalCode.value.state,
    })
  }

  getNationalityChange(){
    console.log("getNationalityChange===",this.nationality.value.alpha-3);
    if(this.personalDetailsForm.value.passport_number != ''){
      console.log(typeof this.personalDetailsForm.value.passport_number);
      this.personalDetailsForm.patchValue({nationality_code:this.nationality.value['alpha-3']})
      // this.personalDetailsForm.patchValue({
      //   passport_number:(this.personalDetailsForm.value.passport_number).concat(this.nationality.value['alpha-3'])
      // })
    }
  }

  getPersonalDetails(){
    console.log("------personal form--------",this.race);
    localStorage.setItem('PersonalDetails',JSON.stringify(this.personalDetailsForm.value));
    localStorage.setItem('race',JSON.stringify(this.race.value));
    localStorage.setItem('nricType',JSON.stringify(this.nricType.value))
    localStorage.setItem('nationality',JSON.stringify(this.nationality.value))
    localStorage.setItem('postalCode',JSON.stringify(this.postalCode.value))
    localStorage.setItem('placeBirth',JSON.stringify(this.placeBirth.value))
  }

  getPreferenceDetails(stepper: MatStepper){
    console.log("------personal form--------",this.race);
    this.studentService.checkUsernameExistence(this.preferenceForm.value.user_name)
    .subscribe(res=>{
      if(res['status'] == 'New'){
        localStorage.setItem('PreferenceDetails',JSON.stringify(this.preferenceForm.value));
        localStorage.setItem('preference',JSON.stringify(this.preference.value));
        stepper.next();
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error("User Name Already Exists");
        this.preferenceForm.value.user_name='';
      }
    })
  }


  onFileChangePhoto(event,filetype) { 
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("-----",this[filetype+'_preview']);
        this[filetype+'_preview']=reader.result;
        this.documentForm.patchValue({
          [filetype+'_name']:file
        })
      }
    }
  }


  saveStudentData(showStudent) {
    this.confirmPreferenceData=JSON.parse(localStorage.PreferenceDetails);
    this.confirmPersonalData=JSON.parse(localStorage.PersonalDetails);
    this.modalService.open(showStudent, { ariaLabelledBy: 'modal-basic-title' });
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   // data: row,
    //   // direction: tempDirection,
    // });
  }


  setConfirmStudentDetails(){
    console.log("this.documentForm===",this.documentForm.value)
    var studNum=(this.personalDetailsForm.value.nric_number ? this.personalDetailsForm.value.nric_number :this.personalDetailsForm.value.passport_number)
    const formData = new FormData();
    formData.append('baseRoot','root/Students/'+ ('stud-'+studNum));
    formData.append('race',this.race.value.id);
    formData.append('nricType',this.nricType.value.id);
    formData.append('nationality',this.nationality.value.id);
    formData.append('postalCode',this.postalCode.value.id);
    formData.append('preference',this.preference.value.id);
    formData.append('placeBirth',this.placeBirth.value.id);
    formData.append('personalDetails',JSON.stringify(this.personalDetailsForm.value));
    formData.append('preferenceDetails',JSON.stringify(this.preferenceForm.value));
    formData.append('photo',this.documentForm.value.photo_name);
    formData.append('nricFront',this.documentForm.value.nric_front_name);
    formData.append('nricRear',this.documentForm.value.nric_rear_name);
    formData.append('passportFront',this.documentForm.value.passport_front_name);
    formData.append('workPermit',this.documentForm.value.work_permit_name);
    this.spinner.show();
    this.studentService.setStudentDetails(formData)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success("Registered Successfully!!");
        this.modalService.dismissAll();
        localStorage.removeItem('PersonalDetails');
        localStorage.removeItem('race');
        localStorage.removeItem('nricType');
        localStorage.removeItem('nationality');
        localStorage.removeItem('postalCode');
        localStorage.removeItem('placeBirth');
        localStorage.removeItem('PreferenceDetails');
        localStorage.removeItem('preference');
        localStorage.removeItem('documentDetails');
        this.personalDetailsForm.reset();
        this.preferenceForm.reset();
        this.documentForm.reset();
        this.race.setValue('');
        this.nricType.setValue(''); 
        this.nationality.setValue('');  
        this.postalCode.setValue('');
        this.preference.setValue('');
        this.placeBirth.setValue('');
        this.photo_preview='';
        this.nric_front_preview='';
        this.nric_rear_preview='';
        this.passport_front_preview='';
        this.work_permit_preview='';
        this.router.navigate(['/clerk/students/all-students'])
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
      if(res['status'] == 'Already Exists'){
        this.toastrService.warning("User Name Already Exists ")
      }
        
    })
  }
}
