import { Component, OnInit,ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {  FormBuilder,FormArray,FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith } from 'rxjs';
import { LanguageService } from '../../../core/service/language.service';
import {Router,ActivatedRoute} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import {PreRequisiteService} from '../pre-requisite.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';


function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-add-pre-requisite',
  templateUrl: './add-pre-requisite.component.html',
  styleUrls: ['./add-pre-requisite.component.sass']
})
export class AddPreRequisiteComponent implements OnInit {

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;
  
  addPreRequisiteForm:FormGroup;
  preRequisitesList=[];
  reqDocumentsList=[];
  licenseTypeData;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  license_selected= [];

  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  
  licenseTypeList: Observable<string[]>;
  

  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,
    private router: Router,private route: ActivatedRoute,
    private preRequisiteService:PreRequisiteService,
    private spinner:NgxSpinnerService) {

      this.addPreRequisiteForm = this.fb.group({
        preRequisites_english: this.fb.array([this.fb.control('')]),
        preRequisites_malay: this.fb.array([this.fb.control('')]),
        reqDocuments_english: this.fb.array([this.fb.control('')]),
        reqDocuments_malay: this.fb.array([this.fb.control('')])
      })

     }

  ngOnInit(): void {
    this.getLicenseList();
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      this.getLicenseList();
    })
  }

  public validation_msgs = {
    'license_type': [
      { type: 'invalidAutocompleteObject', message: 'License Type not recognized. Click one of the options.' },
      { type: 'required', message: 'License Type is required.' }
    ],
  }

  // getLicenseTypeList(){
  //   this.preRequisiteService.getLicenseTypeList()
  //   .subscribe(res=>{
  //       this.licenseTypeData=res['data'];
  //       this.licenseTypeList = this.license_type.valueChanges.pipe(
  //         startWith(''),
  //         map(value => (typeof value === 'string' ? value : value[this.translateVal])),
  //         map(name => (name ? this._filterLicenseType(name) : this.licenseTypeData.slice())),
  //       );
  //   })
  // }

  getLicenseList(){
    this.preRequisiteService.getLicenseClassList()
    .subscribe(res=>{
      console.log("client--------",res);
      this.licenseTypeData=res['data'];
      console.log("this.this.license_type=========",this.license_type);
      this.licenseTypeList = this.license_type.valueChanges.pipe(
        startWith(''),
        map((fruit: string | null) => fruit ? this._filterLicenseType(fruit) : this.licenseTypeData.slice()));
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log("------------",value)
    // Add our fruit
    if ((value || '').trim()) {
      this.license_selected.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.license_type.setValue(null);
  }

  remove(license: string): void {
    const index = this.license_selected.indexOf(license);

    if (index >= 0) {
      this.license_selected.splice(index, 1);
    }    
  }

  selectedListType(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.viewValue;
    console.log("newValue=======",event.option.viewValue);
    if (this.license_selected.includes(newValue)) {
      this.license_selected = [...this.license_selected.filter(fruit=>fruit !== newValue)];
    } else {
      this.license_selected.push(event.option.viewValue);
    }

    this.licenceInput.nativeElement.value = '';
    this.license_type.setValue(null);

    // keep the autocomplete opened after each item is picked.
    requestAnimationFrame(()=>{
      this.openAuto(this.matACTrigger);
    })

  }


  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    this.licenceInput.nativeElement.focus();
    console.log(trigger);
  }



  displayFn(user): string {
    return user && user.license_class ? user.license_class : '';
  }

  private _filterLicenseType(name): [] {
    console.log("name=====",name);
    const filterValue = name.toLowerCase();
    return this.licenseTypeData.filter(option => option.license_class.toLowerCase().includes(filterValue));
  }

  get preRequisites_english() {
    return this.addPreRequisiteForm.get('preRequisites_english') as FormArray;
  }

  get preRequisites_malay() {
    return this.addPreRequisiteForm.get('preRequisites_malay') as FormArray;
  }

  get reqDocuments_english() {
    return this.addPreRequisiteForm.get('reqDocuments_english') as FormArray;
  }

  get reqDocuments_malay() {
    return this.addPreRequisiteForm.get('reqDocuments_malay') as FormArray;
  }

  addNewPreRequisiteEnglish() {
    this.preRequisites_english.push(this.fb.control(''));
  }

  removePreRequisiteEnglish(index) {
    (this.addPreRequisiteForm.get('preRequisites_english') as FormArray).removeAt(index);
  }

  addNewPreRequisiteMalay() {
    this.preRequisites_malay.push(this.fb.control(''));
  }

  removePreRequisiteMalay(index) {
    (this.addPreRequisiteForm.get('preRequisites_malay') as FormArray).removeAt(index);
  }

  addNewReqDocumentsEnglish() {
    this.reqDocuments_english.push(this.fb.control(''));
  }

  removeReqDocumentsEnglish(index) {
    (this.addPreRequisiteForm.get('reqDocuments_english') as FormArray).removeAt(index);
  }

  addNewReqDocumentsMalay() {
    this.reqDocuments_malay.push(this.fb.control(''));
  }

  removeReqDocumentsMalay(index) {
    (this.addPreRequisiteForm.get('reqDocuments_malay') as FormArray).removeAt(index);
  }

  onSelectionChange(){
    this.preRequisiteService.checkPreRequistiesExistence(this.license_type.value.id)
    .subscribe(res=>{
        if(res['status'] == 'Exists'){
          this.toastrService.error("Already Exists!!!");
          this.license_type.setValue('')
        }
    })
  }

  setPreRequisiteDetails(){
    this.preRequisitesList=[];
    this.reqDocumentsList=[];
    console.log("this.preRequisites_english=====",this.addPreRequisiteForm.value,this.license_selected);
    // if(this.addPreRequisiteForm.value.preRequisites_english.length == this.addPreRequisiteForm.value.preRequisites_malay.length){
    //     for(let i=0;i<this.addPreRequisiteForm.value.preRequisites_english.length;i++){
    //         this.preRequisitesList.push({
    //           'preReq_english':this.addPreRequisiteForm.value.preRequisites_english[i],
    //           'preReq_malay':this.addPreRequisiteForm.value.preRequisites_malay[i],
    //         })
    //     }
    // }else{
    //   this.toastrService.error("Please check with Pre-requisites Info!!!");
    // }
    // if(this.addPreRequisiteForm.value.reqDocuments_english.length == this.addPreRequisiteForm.value.reqDocuments_malay.length){
    //   for(let j=0;j<this.addPreRequisiteForm.value.reqDocuments_english.length;j++){
    //       this.reqDocumentsList.push({
    //         'reqDoc_english':this.addPreRequisiteForm.value.reqDocuments_english[j],
    //         'reqDoc_malay':this.addPreRequisiteForm.value.reqDocuments_malay[j],
    //       })
    //   }
    // }else{
    //   this.toastrService.error("Please check with Required Documents Info!!!");
    // }

    // if((this.addPreRequisiteForm.value.preRequisites_english.length == this.preRequisitesList.length) && (this.addPreRequisiteForm.value.preRequisites_malay.length == this.preRequisitesList.length) && (this.addPreRequisiteForm.value.reqDocuments_english.length == this.reqDocumentsList.length)&& (this.addPreRequisiteForm.value.reqDocuments_malay.length == this.reqDocumentsList.length)){
    //   this.spinner.show();
    //   this.preRequisiteService.setPreRequisiteDetails(this.license_type.value,this.preRequisitesList,this.reqDocumentsList)
    //     .subscribe(res=>{
    //       this.spinner.hide();
    //       if(res['status'] == 'Success'){
    //         this.toastrService.success("Updated Successfully!!!!");
    //         this.router.navigate(['/admin/pre-requisite/pre-requisite-list']);
    //       }
    //       if(res['status'] == 'Session Expired'){
    //         this.toastrService.error("Session Expired!!!")
    //         this.router.navigate(['/authentication/signin']);
    //       }
          
    //     })
    // }
    
  }

  goBack(){
    this.router.navigate(['/admin/pre-requisite/pre-requisite-list']);
  }


}
