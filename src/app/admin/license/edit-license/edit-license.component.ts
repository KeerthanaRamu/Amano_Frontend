import { Component, OnInit,ViewChild,ChangeDetectorRef, ElementRef } from '@angular/core';
import {  AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LanguageService } from '../../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {LicenseService} from '../license.service'
import {Router,ActivatedRoute} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, Observable, startWith } from 'rxjs';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-edit-license',
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.scss']
})
export class EditLicenseComponent implements OnInit {

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('AdvancelicenceInput') AdvancelicenceInput: ElementRef<HTMLInputElement>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  license_selected= [];
  license_display=[];

  
  licenseClassData:any;
  advanceLicenseData:any;

  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  advance_license= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 

  licenseClassList: Observable<string[]>;
  advanceLicenseList: Observable<string[]>;

  showUpgradeLicense: boolean=false;
  showAdvanceLicense: boolean=false;

  editLicenseForm:FormGroup;
  public Editor = ClassicEditor;
  licenseId;
  licenseImg_preview;
  licenseFlow_preview;
  apiURL=environment.apiUrl;

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,private licenseService:LicenseService,
    private router: Router,private route: ActivatedRoute,private spinner:NgxSpinnerService) {
      this.licenseId=this.route.snapshot.paramMap.get('id');
      this.editLicenseForm = this.fb.group({
        id:[''],
        prev_license_class: ['', Validators.required],
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
        isActive:[''],
        upgradeLicense:[false],
        advanceLicense:[false]
      });
      this.getLicenseList();
     }

     ngOnInit(): void {
      this.spinner.show();
      this.licenseService.getLicenseToEdit(this.licenseId)
      .subscribe(res=>{
        let licenseList=[];
        let licenseObj=[];
        this.spinner.hide();
        if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }else{
          if(res['data'].length > 0){
            let resObj=res['data'][0]
            this.editLicenseForm.patchValue({
              id:resObj.id,
              prev_license_class: resObj.license_class,
              license_class: resObj.license_class,
              cdl_req: resObj.cdl_requirement == 1?true :false,
              gdlPractical: resObj.gdl_practical == 1?true :false,
              psvPractical: resObj.psv_practical == 1?true :false,
              minimum_age: resObj.minimum_age,
              license_desc_english: resObj.license_desc_english,
              license_desc_malay: resObj.license_desc_malay,
              criteria_english:resObj.criteria_english,
              criteria_malay:resObj.criteria_malay,
              license_flow: resObj.license_flow,
              license_flow_name:resObj.license_flow,
              license_image:resObj.license_image,
              license_image_name:resObj.license_image,
              isActive:resObj.is_active
            });
            let upgradeList=res['advanceList'].filter((elem)=>{return elem.license_category=='Upgrade'});
            let advanceList=res['advanceList'].filter((elem)=>{return elem.license_category=='Advance'});
            
            if(upgradeList.length > 0){
              this.showUpgradeLicense=true;
              this.editLicenseForm.patchValue({upgradeLicense:true});
              var licenseTypeObj=this.licenseClassData.filter((elem)=>{return elem.id==upgradeList[0].ext_license_id});
              this.license_type.setValue(licenseTypeObj[0])
            }

            if(advanceList.length > 0){
              this.showAdvanceLicense=true;
              this.editLicenseForm.patchValue({advanceLicense:true})
            }

            for(let i=0;i<advanceList.length;i++){
              licenseList.push(advanceList[i].license_class);
              licenseObj.push({
                id:advanceList[i].ext_license_id,
                license_class:advanceList[i].license_class
              })
            }

            this.license_display=licenseList;
            this.license_selected=licenseObj
          }else{
            this.toastrService.error("No Data Found!!!")
          }
         
        }
          
      });
     
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

  onFileChangeLicenseFlow(event){
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.licenseFlow_preview=reader.result;
        this.editLicenseForm.patchValue({
          license_flow:file
        })
        console.log("this.documentForm===",this.editLicenseForm)
      }
    }
  }

  onFileChangeLicenseImage(event){
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
      this.licenseImg_preview=reader.result;
        this.editLicenseForm.patchValue({
          license_image:file
        })
        console.log("this.documentForm===",this.editLicenseForm)
      }
    }
  }


  goBack(){
    this.router.navigate(['/admin/license/license-list']);
  }


  updateLicenseDetails(){
    console.log("Editor===",this.editLicenseForm.value );
    this.spinner.show();
    const formData = new FormData();
    formData.append('baseRoot','root/License/'+this.editLicenseForm.value.license_class);
    formData.append('licenseData',JSON.stringify(this.editLicenseForm.value));
    formData.append('licenseImage',this.editLicenseForm.value.license_image);
    formData.append('licenseFlow',this.editLicenseForm.value.license_flow);
    formData.append('license_type',JSON.stringify(this.license_type.value))
    formData.append('license_selected',JSON.stringify(this.license_selected))
    if(this.editLicenseForm.value.upgradeLicense == true && this.editLicenseForm.value.advanceLicense == true){
      if(this.license_type.valid && this.license_selected.length > 0){
        this.spinner.show();
        this.licenseService.updateLicenseDetails(formData)
        .subscribe(res=>{
          this.spinner.hide();
          if(res['status'] == 'Success'){
            this.toastrService.success("Updated Successfully!!");
            this.editLicenseForm.reset();
            this.router.navigate(['/admin/license/license-list']);
          }else  if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }else{
            this.toastrService.error(res['status']);
          }
        })
      }else{
        this.toastrService.warning("Please Select Upgrade and Advance License!!")
      }
    }else if(this.editLicenseForm.value.upgradeLicense == false && this.editLicenseForm.value.advanceLicense == true){
      if(this.license_selected.length > 0){
        this.spinner.show();
        this.licenseService.updateLicenseDetails(formData)
        .subscribe(res=>{
          this.spinner.hide();
          if(res['status'] == 'Success'){
            this.toastrService.success("Updated Successfully!!");
            this.editLicenseForm.reset();
            this.router.navigate(['/admin/license/license-list']);
          }else  if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }else{
            this.toastrService.error(res['status']);
          }
        })
      }else{
        this.toastrService.warning("Please Select Advance License!!")
      }
    }else if(this.editLicenseForm.value.upgradeLicense == true && this.editLicenseForm.value.advanceLicense == false){
      if(this.license_type.valid){
        this.spinner.show();
        this.licenseService.updateLicenseDetails(formData)
        .subscribe(res=>{
          this.spinner.hide();
          if(res['status'] == 'Success'){
            this.toastrService.success("Updated Successfully!!");
            this.editLicenseForm.reset();
            this.router.navigate(['/admin/license/license-list']);
          }else  if(res['status'] == 'Session Expired'){
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
      this.spinner.show();
      this.licenseService.updateLicenseDetails(formData)
      .subscribe(res=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          this.toastrService.success("Updated Successfully!!");
          this.editLicenseForm.reset();
          this.router.navigate(['/admin/license/license-list']);
        }else  if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }else{
          this.toastrService.error(res['status']);
        }
      })
    }
  }

}
