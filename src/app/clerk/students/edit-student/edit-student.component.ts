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
import { NgxSpinnerService } from "ngx-spinner";
import {environment} from '../../../../environments/environment'
import { FileValidator } from 'ngx-material-file-input';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.sass'],
})
export class EditStudentComponent {

  isLinear = false;
  clientCode;
  personalDetailsEditForm: FormGroup;
  preferenceEditForm: FormGroup;
  documentEditForm:FormGroup;
  raceData: any;
  nricTypeData:any;
  nationalityData:any;
  postalCodeData:any;
  preferenceData:any;
  placeBirthData:any;
  studentId;
  apiURL=environment.apiUrl;

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

  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  
  hide = true;
  showOtherRace=false;

  public validation_msgs = {
    'race': [
      { type: 'invalidAutocompleteObject', message: 'Race not recognized. Click one of the options.' },
      { type: 'required', message: 'Race is required.' }
    ],
    'nricType': [
      { type: 'invalidAutocompleteObject', message: 'NRIC Type not recognized. Click one of the options.' },
      { type: 'required', message: 'NRIC Type is required.' }
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
    private modalService: NgbModal,private toastrService: ToastrService,private router: Router,
    private route: ActivatedRoute,private spinner: NgxSpinnerService) {
      
    this.studentId=this.route.snapshot.paramMap.get('id');
    this.personalDetailsEditForm = this.fb.group({
      id:[''],
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
    });
    this.preferenceEditForm = this.fb.group({   
      emergency_name: [''],
      emergency_number: [''],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      expiry_date:['']
    });
    this.documentEditForm= this.fb.group({
      photo: [{ value: undefined, disabled: false },[FileValidator.maxContentSize(200000)]],
      photo_name: new FormControl('',Validators.required),
      photo_edit: new FormControl('',Validators.required),
      nric_front: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      nric_front_name: new FormControl(''),
      nric_front_edit: new FormControl(''),
      nric_rear: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      nric_rear_name: new FormControl(''),
      nric_rear_edit: new FormControl(''),
      passport_front: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      passport_front_name: new FormControl(''),
      passport_front_edit: new FormControl(''),
      work_permit: [{ value: undefined, disabled: false }, [FileValidator.maxContentSize(200000)]],
      work_permit_name: new FormControl(''),
      work_permit_edit: new FormControl(''),
      isActive:[false]
    });

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
    });
  }

  ngOnInit(): void {
    this.spinner.show();
  
    setTimeout(()=>{
      this.studentService.getStudentDetailToEdit(this.studentId)
      .subscribe(res=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          let resObjStud=res['studData'][0];
          console.log("resObjStud=====",resObjStud);
          let resObjDoc=res['docData'][0];
          console.log("resObjStud=====",resObjDoc);
            this.personalDetailsEditForm.patchValue({
              id:resObjStud.id,
              name: resObjStud.name,
              nric_number:(resObjStud.nric_number != null ? resObjStud.nric_number : null),
              passport_number: (resObjStud.passport_number != null ? resObjStud.passport_number : null), 
              gender:resObjStud.gender,
              ic_address:resObjStud.address_nric,
              address1:resObjStud.address1,
              address2:resObjStud.address2,
              city: resObjStud.city,
              state: resObjStud.state,
              email_address: resObjStud.email_id,
              mobile_number: resObjStud.mobile_number,
              other_race:resObjStud.other_race,
              other_placebirth:resObjStud.other_placebirth,
              date_of_birth: resObjStud.date_of_birth,
            });

            this.preferenceEditForm.patchValue({
              emergency_name: resObjStud.emergency_name,
              emergency_number: resObjStud.emergency_number,
              user_name: resObjStud.user_name,
              password: resObjStud.password,
              expiry_date:resObjStud.license_expiry_date
            });

            this.documentEditForm.patchValue({
              photo_edit: resObjStud.profile_img,
              photo_name: resObjStud.profile_img,
              nric_front_edit: resObjDoc.nric_front,
              nric_front_name: resObjDoc.nric_front,
              nric_rear_edit: resObjDoc.nric_rear,
              nric_rear_name: resObjDoc.nric_rear,
              passport_front_edit: resObjDoc.passport_front,
              passport_front_name: resObjDoc.passport_front,
              work_permit_edit: resObjDoc.work_permit_front,
              work_permit_name: resObjDoc.work_permit_front,
              isActive:(resObjStud.is_active == 1 ? true : false),
            });

            console.log("this.postalCodeData!!!!!!!!!!!!",this.postalCodeData)
            var raceObj=this.raceData.filter((elem)=>{return elem.id==resObjStud.race_id});
            var nricObj=this.nricTypeData.filter((elem)=>{return elem.id==resObjStud.nric_type});
            var nationalityObj=this.nationalityData.filter((elem)=>{return elem.id==resObjStud.nationality_id});
            var postalObj=this.postalCodeData.filter((elem)=>{return elem.id==resObjStud.postalcode_id});
            var placeBirthObj=this.placeBirthData.filter((elem)=>{return elem.id==resObjStud.placebirth_id});
            var prefObj=this.preferenceData.filter((elem)=>{return elem.id==resObjStud.prefered_lang_id});
            this.race.setValue(raceObj[0]);
            this.nricType.setValue(nricObj[0]);
            this.nationality.setValue(nationalityObj[0]);
            this.placeBirth.setValue(placeBirthObj[0]);
            this.postalCode.setValue(postalObj[0]);
            this.preference.setValue(prefObj[0]);
            console.log("this.race===",this.race);
        }if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
      });
   
    },500)
      
     
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
    this.studentService.getPostalCode()
      .subscribe(res=>{
        this.postalCodeData=res;
       console.log("this.postalCodeData===",this.postalCodeData)
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

  displayFnPostalCode(user): string {
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
    const filterValue = name.toLowerCase();
    return this.postalCodeData.filter(option => option.postal_code.toLowerCase().includes(filterValue));
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
    console.log("---",this.personalDetailsEditForm.value.nric_number,this.nricType);
    const restrictList=[1,2,6]
    // this.personalDetailsEditForm.value.nric_number.charAt(this.personalDetailsEditForm.value.nric_number.length-1)
    if(restrictList.indexOf(this.nricType.value.id) >= 0){
      if((this.personalDetailsEditForm.value.nric_number.charAt(this.personalDetailsEditForm.value.nric_number.length-1)) % 2 == 0){
        this.personalDetailsEditForm.patchValue({gender:"Female"})
      }else{
        this.personalDetailsEditForm.patchValue({gender:"Male"})
      }
    }else{
      this.personalDetailsEditForm.patchValue({gender:""})
    }
  }

  getNRICNumberChange(){
    console.log("---",(this.personalDetailsEditForm.value.nric_number).substr(2,2));
    this.personalDetailsEditForm.value.passport_number='';
    this.studentService.checkNRICExistence(this.personalDetailsEditForm.value.nric_number)
    .subscribe(res=>{
      if(res['status'] == 'New'){
        console.log((this.personalDetailsEditForm.value.nric_number).substr(2,2)+"/"+(this.personalDetailsEditForm.value.nric_number).substr(4,2)+"/"+(this.personalDetailsEditForm.value.nric_number).substr(0,2))
        this.personalDetailsEditForm.patchValue({date_of_birth:new Date((this.personalDetailsEditForm.value.nric_number).substr(2,2)+"/"+(this.personalDetailsEditForm.value.nric_number).substr(4,2)+"/"+(this.personalDetailsEditForm.value.nric_number).substr(0,2))})
        const restrictList=[1,2,6]
        // this.personalDetailsEditForm.value.nric_number.charAt(this.personalDetailsEditForm.value.nric_number.length-1)
        if(restrictList.indexOf(this.nricType.value.id) >= 0){
          if((this.personalDetailsEditForm.value.nric_number.charAt(this.personalDetailsEditForm.value.nric_number.length-1)) % 2 == 0){
            this.personalDetailsEditForm.patchValue({gender:"Female"})
          }else{
            this.personalDetailsEditForm.patchValue({gender:"Male"})
          }
        }else{
          this.personalDetailsEditForm.patchValue({gender:""})
        }
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error("NRIC Number Already Exists");
        this.personalDetailsEditForm.value.nric_number='';
      }
    
    })
   
  }

  getPassportNumberChange(){
    this.personalDetailsEditForm.value.nric_number='';
    this.studentService.checkPassportExistence(this.personalDetailsEditForm.value.passport_number)
    .subscribe(res=>{
      if(res['status'] == 'New'){
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error("Passport Number Already Exists");
        this.personalDetailsEditForm.value.passport_number='';
      }
    })
  }

  // getPersonalDetails(){
  //   console.log("------personal form--------",this.race);
  //   localStorage.setItem('PersonalDetails',JSON.stringify(this.personalDetailsEditForm.value));
  //   localStorage.setItem('race',JSON.stringify(this.race.value));
  //   localStorage.setItem('nricType',JSON.stringify(this.nricType.value))
  //   localStorage.setItem('nationality',JSON.stringify(this.nationality.value))
  //   localStorage.setItem('postalCode',JSON.stringify(this.postalCode.value))
  //   localStorage.setItem('placeBirth',JSON.stringify(this.placeBirth.value))
  // }

  
  getPostalCodeChange(){
    console.log("postalCode===",this.postalCode.value);
    this.personalDetailsEditForm.patchValue({
      city:this.postalCode.value.city,
      state:this.postalCode.value.state,
    })

  }

  getPreferenceDetails(stepper: MatStepper){
    console.log("------personal form--------",this.race);
    stepper.next();
  }


  onFileChangePhoto(event,filetype) { 
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("-----",this[filetype+'_preview']);
        this[filetype+'_preview']=reader.result;
        this.documentEditForm.patchValue({
          [filetype+'_name']:file
        })
        console.log("this.documentEditForm===",this.documentEditForm)
      }
    }
  }


  saveStudentData(showStudent) {
    this.modalService.open(showStudent, { ariaLabelledBy: 'modal-basic-title' });
  }


  updateConfirmStudentDetails(){
    console.log("this.documentEditForm.value.isActive---",this.documentEditForm.value.isActive, typeof this.documentEditForm.value.isActive)
    this.spinner.show();
    var studNum=(this.personalDetailsEditForm.value.nric_number ? this.personalDetailsEditForm.value.nric_number :this.personalDetailsEditForm.value.passport_number)
    const formData = new FormData();
    formData.append('baseRoot','root/Students/'+ ('stud-'+studNum));
    formData.append('race',this.race.value.id);
    formData.append('nricType',this.nricType.value.id);
    formData.append('nationality',this.nationality.value.id);
    formData.append('postalCode',this.postalCode.value.id);
    formData.append('preference',this.preference.value.id);
    formData.append('placeBirth',this.placeBirth.value.id);
    formData.append('personalDetails',JSON.stringify(this.personalDetailsEditForm.value));
    formData.append('preferenceDetails',JSON.stringify(this.preferenceEditForm.value));
    formData.append('documentDetails',JSON.stringify(this.documentEditForm.value));
    formData.append('photo',this.documentEditForm.value.photo_name);
    formData.append('nricFront',this.documentEditForm.value.nric_front_name);
    formData.append('nricRear',this.documentEditForm.value.nric_rear_name);
    formData.append('passportFront',this.documentEditForm.value.passport_front_name);
    formData.append('workPermit',this.documentEditForm.value.work_permit_name);
    formData.append('isActive',this.documentEditForm.value.isActive);
    
    this.studentService.updateConfirmStudentDetails(formData)
    .subscribe(res=>{
      this.spinner.hide();
      console.log("res========",res)
      if(res['status'] == 'Success'){
        this.toastrService.success("Updated Successfully!!");
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
        this.personalDetailsEditForm.reset();
        this.preferenceEditForm.reset();
        this.documentEditForm.reset();
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
        this.modalService.dismissAll();
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
        
    })
  }
}
