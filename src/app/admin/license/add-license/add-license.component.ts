import { Component, OnInit,ViewChild,ChangeDetectorRef, ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { LanguageService } from '../../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {LicenseService} from '../license.service'
import {Router,ActivatedRoute} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.scss']
})
export class AddLicenseComponent implements OnInit {

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('AdvancelicenceInput') AdvancelicenceInput: ElementRef<HTMLInputElement>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  license_selected= [];
  license_display=[];

  addLicenseForm:FormGroup;
  disableSubmit:boolean=false;

  licenseClassData:any;
  advanceLicenseData:any;

  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  advance_license= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 

  licenseClassList: Observable<string[]>;
  advanceLicenseList: Observable<string[]>;
  
  public Editor = ClassicEditor;
  showUpgradeLicense: boolean=false;
  showAdvanceLicense: boolean=false;

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,private licenseService:LicenseService,
    private router: Router,private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {
      this.getLicenseList();
     }

  ngOnInit(): void {

    this.addLicenseForm = this.fb.group({
      license_class: ['', Validators.required],
      minimum_age: [''],
      license_desc_english: ['', Validators.required],
      license_desc_malay: ['', Validators.required],
      criteria_english:['', Validators.required],
      criteria_malay:['', Validators.required],
      license_flow:['', Validators.required],
      license_flow_name:['', Validators.required],
      license_image:['', Validators.required],
      license_image_name:['', Validators.required],
      cdl_req:[''],
      gdlPractical:[false],
      psvPractical:[false],
      upgradeLicense:[false],
      advanceLicense:[false]
    });
   
  }

    // ---------------------get license list-----------------
    getLicenseList(){
      this.licenseService.getLicenseClassList()
      .subscribe(res=>{
        this.licenseClassData=res['data'];
        this.licenseClassList = this.license_type.valueChanges.pipe(
          startWith(''),
          map((fruit: string | null) => fruit ? this._filterLicenseType(fruit) : this.licenseClassData.slice()));

        this.advanceLicenseData=res['data'];
        this.advanceLicenseList = this.advance_license.valueChanges.pipe(
          startWith(''),
          map((fruit: string | null) => fruit ? this._filterAdvanceLicenseType(fruit) : this.advanceLicenseData.slice()));
      })
    }

    displayFnLicense(user): string {
      return user && user.license_class ? user.license_class : '';
    }
  
    private _filterLicenseType(name): [] {
      const filterValue = name.toLowerCase();
      return this.licenseClassData.filter(option => option.license_class.toLowerCase().includes(filterValue));
    }

    private _filterAdvanceLicenseType(name): [] {
      const filterValue = name.toLowerCase();
      return this.advanceLicenseData.filter(option => option.license_class.toLowerCase().includes(filterValue));
    }
  
  
    public validation_msgs = {
      'license_type': [
        { type: 'invalidAutocompleteObject', message: 'License Class not recognized. Click one of the options.' }
      ],
      'advance_license': [
        { type: 'invalidAutocompleteObject', message: 'License Class not recognized. Click one of the options.' }
      ],
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
  
      this.advance_license.setValue(null);
    }
  
    remove(license: string): void {
      alert("Removeeee")
      console.log("license-----",license)
    const index1= this.license_display.indexOf(license)
      if (index1 >= 0) {
        this.license_display.splice(index1, 1);
      }    
      this.license_selected=this.license_selected.filter(value=>value.license_class != license);
  
    }
  
    selectedListType(event: MatAutocompleteSelectedEvent): void {
      const newValue = event.option.value.license_class;
      console.log("newValue=======",newValue,this.license_selected.length);
      
      if(this.license_display.includes(newValue)) {
        this.license_display = [...this.license_display.filter(fruit=>fruit !== newValue)];
        this.license_selected = [...this.license_selected.filter(fruit=>fruit.id !== event.option.value.id)];
      }else {
        this.license_display.push(newValue)
        this.license_selected.push({
          id:event.option.value.id,
          license_class:event.option.value.license_class
        })
      }
  
      this.AdvancelicenceInput.nativeElement.value = '';
      this.advance_license.setValue(null);
  
      // keep the autocomplete opened after each item is picked.
      requestAnimationFrame(()=>{
        this.openAuto(this.matACTrigger);
      })
  
    }
  
  
    openAuto(trigger: MatAutocompleteTrigger) {
      trigger.openPanel();
      this.AdvancelicenceInput.nativeElement.focus();
      console.log(trigger);
    }
    


    checkUpgrade(event){
      if (event.checked == true) { 
        this.showUpgradeLicense=true;
      }else{
        this.showUpgradeLicense=false;
      }
    }

    checkAdvance(event){
      if (event.checked == true) { 
        this.showAdvanceLicense=true;
      }else{
        this.showAdvanceLicense=false;
      }
    }

  onFileChangeLicenseFlow(event){
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addLicenseForm.patchValue({
          license_flow:file
        })
        console.log("this.documentForm===",this.addLicenseForm)
      }
    }
  }

  onFileChangeLicenseImage(event){
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addLicenseForm.patchValue({
          license_image:file
        })
        console.log("this.documentForm===",this.addLicenseForm)
      }
    }
  }


  setLicenseDetails(){
    console.log("Editor===",this.addLicenseForm.value );
    const formData = new FormData();
    formData.append('baseRoot','root/License/'+this.addLicenseForm.value.license_class);
    formData.append('licenseData',JSON.stringify(this.addLicenseForm.value));
    formData.append('licenseImage',this.addLicenseForm.value.license_image);
    formData.append('licenseFlow',this.addLicenseForm.value.license_flow);
    formData.append('license_type',JSON.stringify(this.license_type.value))
    formData.append('license_selected',JSON.stringify(this.license_selected))
    console.log("this.license_selected=======",this.license_selected,this.license_type)
    if(this.addLicenseForm.value.upgradeLicense == true && this.addLicenseForm.value.advanceLicense == true){
      if(this.license_type.valid && this.license_selected.length > 0){
        this.disableSubmit=true;
        this.spinner.show();
        this.licenseService.setLicenseDetails(formData)
        .subscribe(res=>{
          this.spinner.hide();
          this.disableSubmit=false;
          if(res['status'] == 'Success'){
            this.toastrService.success("Registered Successfully!!");
            this.addLicenseForm.reset();
            this.router.navigate(['/admin/license/license-list'])
          }else if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }else{
            this.toastrService.error(res['status']);
          }
        })
      }else{
        this.toastrService.warning("Please Select Upgrade and Advance License!!")
      }
    }else if(this.addLicenseForm.value.upgradeLicense == false && this.addLicenseForm.value.advanceLicense == true){
      if(this.license_selected.length > 0){
        this.disableSubmit=true;
        this.spinner.show();
        this.licenseService.setLicenseDetails(formData)
        .subscribe(res=>{
          this.spinner.hide();
          this.disableSubmit=false;
          if(res['status'] == 'Success'){
            this.toastrService.success("Registered Successfully!!");
            this.addLicenseForm.reset();
            this.router.navigate(['/admin/license/license-list'])
          }else if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }else{
            this.toastrService.error(res['status']);
          }
        })
      }else{
        this.toastrService.warning("Please Select Advance License!!")
      }
    }else if(this.addLicenseForm.value.upgradeLicense == true && this.addLicenseForm.value.advanceLicense == false){
      if(this.license_type.valid){
        this.disableSubmit=true;
        this.spinner.show();
        this.licenseService.setLicenseDetails(formData)
        .subscribe(res=>{
          this.spinner.hide();
          this.disableSubmit=false;
          if(res['status'] == 'Success'){
            this.toastrService.success("Registered Successfully!!");
            this.addLicenseForm.reset();
            this.router.navigate(['/admin/license/license-list'])
          }else if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }else{
            this.toastrService.error(res['status']);
          }
        })
      }else{
        this.toastrService.warning("Please Select Upgrade License!!")
      }
    }else{
      this.disableSubmit=true;
      this.spinner.show();
      this.licenseService.setLicenseDetails(formData)
      .subscribe(res=>{
        this.spinner.hide();
        this.disableSubmit=false;
        if(res['status'] == 'Success'){
          this.toastrService.success("Registered Successfully!!");
          this.addLicenseForm.reset();
          this.router.navigate(['/admin/license/license-list'])
        }else if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }else{
          this.toastrService.error(res['status']);
        }
      })
    }
  
  }

  goBack(){
    this.router.navigate(['/admin/license/license-list']);
  }


}
