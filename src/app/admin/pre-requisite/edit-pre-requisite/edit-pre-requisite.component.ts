import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, FormArray,FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of } from 'rxjs';
import { LanguageService } from '../../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import {Router,ActivatedRoute} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';

import {PreRequisiteService} from '../pre-requisite.service';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-edit-pre-requisite',
  templateUrl: './edit-pre-requisite.component.html',
  styleUrls: ['./edit-pre-requisite.component.sass']
})
export class EditPreRequisiteComponent implements OnInit {

  preRequisiteId;

  editPreRequisiteForm:FormGroup;
  preRequisitesList=[];
  reqDocumentsList=[];
  licenseTypeData;
  preRequisitesEngList=[];
  preRequisitesMalayList=[];
  reqDocumentsEngList=[];
  reqDocumentsMalayList=[];


  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  
  licenseTypeList: Observable<string[]>;
  

  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,
    private router: Router,private route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private preRequisiteService:PreRequisiteService) { 

    this.preRequisiteId=this.route.snapshot.paramMap.get('id');

    this.editPreRequisiteForm = this.fb.group({
      preRequisites_english: this.fb.array([this.fb.control('')]),
      preRequisites_malay: this.fb.array([this.fb.control('')]),
      reqDocuments_english: this.fb.array([this.fb.control('')]),
      reqDocuments_malay: this.fb.array([this.fb.control('')])
    })

  }

  ngOnInit(): void {
    this.getLicenseTypeList();
    this.getPreRequisitesDetailsToEdit();
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      this.getLicenseTypeList();
    })
  }

  public validation_msgs = {
    'license_type': [
      { type: 'invalidAutocompleteObject', message: 'License Type not recognized. Click one of the options.' },
      { type: 'required', message: 'License Type is required.' }
    ],
  }

  getLicenseTypeList(){
    this.preRequisiteService.getLicenseClassList()
    .subscribe(res=>{
        this.licenseTypeData=res['data'];
        console.log("this.licenseTypeData-----111111--",this.licenseTypeData)
        this.licenseTypeList = this.license_type.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value[this.translateVal])),
          map(name => (name ? this._filterLicenseType(name) : this.licenseTypeData.slice())),
        );
    })
  }

  getPreRequisitesDetailsToEdit(){
    this.spinner.show();
    this.preRequisiteService.getPreRequisitesDetailsToEdit(this.preRequisiteId)
    .subscribe(res=>{
      this.spinner.hide();
      console.log("res['preReqData']=====",res['preReqData'])
      for (let i = 0; i < res['preReqData'].length; i++) {
        this.addNewPreRequisiteEnglish();
        this.addNewPreRequisiteMalay();
        this.preRequisitesEngList.push(res['preReqData'][i].pre_requisites_english);
        this.preRequisitesMalayList.push(res['preReqData'][i].pre_requisites_malay)
      }
      
      for (let j = 0; j < res['reqDocData'].length; j++) {
        this.addNewReqDocumentsEnglish();
        this.addNewReqDocumentsMalay();
        this.reqDocumentsEngList.push(res['reqDocData'][j].req_documents_english)
        this.reqDocumentsMalayList.push(res['reqDocData'][j].req_documents_malay)
      }

      this.editPreRequisiteForm.patchValue({
        preRequisites_english: this.preRequisitesEngList,
        preRequisites_malay:  this.preRequisitesMalayList,
        reqDocuments_english: this.reqDocumentsEngList,
        reqDocuments_malay: this.reqDocumentsMalayList
      });
      console.log("this.licenseTypeData=----",this.licenseTypeData)
      var licenseTypeObj=this.licenseTypeData.filter((elem)=>{return elem.id==this.preRequisiteId});
      this.license_type.setValue(licenseTypeObj[0]);
      console.log("this.license_type=========",this.license_type)
    })
  }

  displayFnLicenseType(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  private _filterLicenseType(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.licenseTypeData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }

  get preRequisites_english() {
    return this.editPreRequisiteForm.get('preRequisites_english') as FormArray;
  }

  get preRequisites_malay() {
    return this.editPreRequisiteForm.get('preRequisites_malay') as FormArray;
  }

  get reqDocuments_english() {
    return this.editPreRequisiteForm.get('reqDocuments_english') as FormArray;
  }

  get reqDocuments_malay() {
    return this.editPreRequisiteForm.get('reqDocuments_malay') as FormArray;
  }

  addNewPreRequisiteEnglish() {
    this.preRequisites_english.push(this.fb.control(''));
  }

  removePreRequisiteEnglish(index) {
    (this.editPreRequisiteForm.get('preRequisites_english') as FormArray).removeAt(index);
  }

  addNewPreRequisiteMalay() {
    this.preRequisites_malay.push(this.fb.control(''));
  }

  removePreRequisiteMalay(index) {
    (this.editPreRequisiteForm.get('preRequisites_malay') as FormArray).removeAt(index);
  }

  addNewReqDocumentsEnglish() {
    this.reqDocuments_english.push(this.fb.control(''));
  }

  removeReqDocumentsEnglish(index) {
    (this.editPreRequisiteForm.get('reqDocuments_english') as FormArray).removeAt(index);
  }

  addNewReqDocumentsMalay() {
    this.reqDocuments_malay.push(this.fb.control(''));
  }

  removeReqDocumentsMalay(index) {
    (this.editPreRequisiteForm.get('reqDocuments_malay') as FormArray).removeAt(index);
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

  updatePreRequisiteDetails(){
    this.preRequisitesList=[];
    this.reqDocumentsList=[];
    console.log("this.preRequisites_english=====",this.editPreRequisiteForm.value);
    if(this.editPreRequisiteForm.value.preRequisites_english.length == this.editPreRequisiteForm.value.preRequisites_malay.length){
        for(let i=0;i<this.editPreRequisiteForm.value.preRequisites_english.length;i++){
            this.preRequisitesList.push({
              'preReq_english':this.editPreRequisiteForm.value.preRequisites_english[i],
              'preReq_malay':this.editPreRequisiteForm.value.preRequisites_malay[i],
            })
        }
    }else{
      this.toastrService.error("Please check with Pre-requisites Info!!!");
    }
    if(this.editPreRequisiteForm.value.reqDocuments_english.length == this.editPreRequisiteForm.value.reqDocuments_malay.length){
      for(let j=0;j<this.editPreRequisiteForm.value.reqDocuments_english.length;j++){
          this.reqDocumentsList.push({
            'reqDoc_english':this.editPreRequisiteForm.value.reqDocuments_english[j],
            'reqDoc_malay':this.editPreRequisiteForm.value.reqDocuments_malay[j],
          })
      }
    }else{
      this.toastrService.error("Please check with Required Documents Info!!!");
    }

    if((this.editPreRequisiteForm.value.preRequisites_english.length == this.preRequisitesList.length) && (this.editPreRequisiteForm.value.preRequisites_malay.length == this.preRequisitesList.length) && (this.editPreRequisiteForm.value.reqDocuments_english.length == this.reqDocumentsList.length)&& (this.editPreRequisiteForm.value.reqDocuments_malay.length == this.reqDocumentsList.length)){
      this.preRequisiteService.updatePreRequisiteDetails(this.license_type.value,this.preRequisitesList,this.reqDocumentsList)
        .subscribe(res=>{
          if(res['status'] == 'Success'){
            this.toastrService.success("Updated Successfully!!!!");
            this.router.navigate(['/admin/pre-requisite/pre-requisite-list']);
          }
           if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
          
        })
    }
    
  }
  goBack(){
    this.router.navigate(['/admin/pre-requisite/pre-requisite-list']);
  }
}
