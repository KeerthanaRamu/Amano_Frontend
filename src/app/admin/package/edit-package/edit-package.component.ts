import { Component, OnInit,ViewChild,ChangeDetectorRef,ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of } from 'rxjs';
import { LanguageService } from '../../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PackageService} from '../package.service';
import {Router,ActivatedRoute} from '@angular/router'
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { NgxSpinnerService } from 'ngx-spinner';
import {environment} from '../../../../environments/environment'
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
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  public Editor = ClassicEditor;

  selectable = false;
  removable = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  license_selected= [];
  show2Phase=false;
  show3Phase=false;
  clientCode;
  package_preview;
  apiURL=environment.apiUrl;

  packageId; 
  editPackageForm:FormGroup;
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  
  licenseTypeData:any;
  packageTypeData:any;
  paymentPhaseData:any;

  license_type = new FormControl('', { validators: [autocompleteObjectValidator()] }); 
  package_type= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });  
  payment_phase= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });  

  licenseTypeList: Observable<string[]>;
  packageTypeList: Observable<string[]>;
  paymentPhaseList: Observable<string[]>;
  license_display: any;
  viewLicensePrice: boolean=false;
  finalPackageValue: any;
  showLi2Phase: boolean=false;
  showLi3Phase: boolean=false;

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,private router: Router,private route: ActivatedRoute,
    private packageService:PackageService,private spinner:NgxSpinnerService,private modalService: NgbModal
  ) {
     this.packageId=this.route.snapshot.paramMap.get('id');
     this.editPackageForm = this.fb.group({
        id:[''],
        package_offers:['',Validators.required],
        package_price: ['', Validators.required],
        prev_package_english: ['', Validators.required],
        prev_package_malay: ['', Validators.required],
        package_english: ['', Validators.required],
        package_malay: ['', Validators.required],
        promo_discount: ['', Validators.required],
        package_desc_english: ['', Validators.required],
        package_desc_malay:['', Validators.required],
        final_package_price:['', Validators.required],
        first_phase_amount:[''],
        second_phase_amount:[''],
        third_phase_amount:[''],
        package_phase_desc_english:['', Validators.required],
        package_phase_desc_malay:['', Validators.required],
        package_image:[''],
        package_image_name:[''],
        global_view:[''],
        upgrade:[''],
      l_license:['']
    });
   }

   

  ngOnInit(): void {
    this.spinner.show();
    this.getPackageTypeList();
    this.getLicenseClassList();
   this.getPaymentPhases();
  
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      this.getPackageTypeList();
      this.getLicenseClassList();
      this.getPaymentPhases();
    })

    this.packageService.getPackageToEdit(this.packageId)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['data'].length > 0){
        let resObj=res['data'][0]
        console.log("resObj--------",resObj)
        this.editPackageForm.patchValue({
          id:resObj.id,
          package_price: resObj.package_price,
          prev_package_english: resObj.package_english,
          prev_package_malay: resObj.package_malay,
          package_english: resObj.package_english,
          package_malay: resObj.package_malay,
          promo_discount: resObj.promo_discount,
          package_desc_english: resObj.package_desc_english,
          package_desc_malay:resObj.package_desc_malay,
          package_offers:resObj.package_offers,
          final_package_price:resObj.final_package_price,
          package_phase_desc_english:resObj.package_phase_desc_english,
          package_phase_desc_malay:resObj.package_phase_desc_malay,
          global_view:resObj.global_view == 1 ? true : false,
          upgrade:resObj.upgrade == 1 ? true : false,
          l_license:resObj.l_license == 1 ? true : false,
        });
        var packageObj=this.packageTypeData.filter((elem)=>{return elem.id==resObj.package_type_id});
        var paymentObj=this.paymentPhaseData.filter((elem)=>{return elem.id==resObj.payment_phase});
        this.license_selected=resObj.license_data;
        this.license_display=resObj.license_list;
        this.package_type.setValue(packageObj[0]);
        this.payment_phase.setValue(paymentObj[0]);
        if(resObj.package_type_id == 2){
            this.viewLicensePrice=false;
            if(this.payment_phase.value.id == 2){
              this.show2Phase=true;
              this.show3Phase=false;
            }else if(this.payment_phase.value.id == 3){
              this.show2Phase=true;
              this.show3Phase=true;
            }else{
              this.show2Phase=false;
              this.show3Phase=false;
            }
            for(let i=0;i<resObj.license_data.length;i++){
              this.editPackageForm.patchValue({
                first_phase_amount:resObj.license_data[i].first_phase_amount,
                second_phase_amount:resObj.license_data[i].second_phase_amount,
                third_phase_amount:resObj.license_data[i].third_phase_amount,
              })
            }
        }else{
          if(this.payment_phase.value.id == 2){
            this.showLi2Phase=true;
            this.showLi3Phase=false;
          }else if(this.payment_phase.value.id == 3){
            this.showLi2Phase=true;
            this.showLi3Phase=true;
          }else{
            this.showLi2Phase=false;       
            this.showLi3Phase=false;
          }
            this.viewLicensePrice=true;
        }
     
      }else{
        this.toastrService.error("No Data Found!!");
      }
    });
  }



  getPackageTypeList(){
    this.packageService.getPakageTypeList()
    .subscribe(res=>{
      this.packageTypeData=res['data'];
      this.packageTypeList = this.package_type.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value[this.translateVal])),
        map(name => (name ? this._filterPackageType(name) : this.packageTypeData.slice())),
      );
    })
  }
  
  getPaymentPhases(){
    this.packageService.getPaymentPhases()
    .subscribe(res=>{
      console.log("res['data']===0",res['data']);
      this.paymentPhaseData=res['data'];
      this.paymentPhaseList = this.payment_phase.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value[this.translateVal])),
        map(name => (name ? this._filterpaymentPhase(name) : this.paymentPhaseData.slice())),
      );
    })
  }
  
  getLicenseClassList(){
    this.packageService.getLicenseClassList()
    .subscribe(res=>{
      this.licenseTypeData=res['data'];
      console.log("this.this.license_type=========",this.license_type);
      this.licenseTypeList = this.license_type.valueChanges.pipe(
        startWith(''),
        map((fruit: string | null) => fruit ? this._filterLicenseType(fruit) : this.licenseTypeData.slice()));
    })
  }

  viewPrice(LicensePrice){
    this.finalPackageValue=this.editPackageForm.value.final_package_price;
    this.modalService.open(LicensePrice, { ariaLabelledBy: 'modal-basic-title', size:'lg'});
  }

  setLicensePrice(){
    let TotalLicensePrice=0;
    let count=0;
    for(let i=0;i<this.license_selected.length;i++){
      let subPhaseAmt=0
      TotalLicensePrice=TotalLicensePrice+Number(this.license_selected[i].license_price);
      subPhaseAmt=subPhaseAmt + Number(Number(this.license_selected[i].first_phase_amount)+Number(this.license_selected[i].second_phase_amount)+Number(this.license_selected[i].third_phase_amount))
      console.log("subPhaseAmt------",this.license_selected[i].license_price,subPhaseAmt)
      if(this.license_selected[i].license_price != subPhaseAmt){
        count++;
      }
    }
    console.log("TotalLicensePrice---",TotalLicensePrice,this.finalPackageValue)
    if(TotalLicensePrice == this.finalPackageValue){
      if(this.payment_phase.value.id > 1){
        if(count > 0){
          this.toastrService.warning("Please check the sum of Phase amount equals the license price!!")
        }else{
          this.modalService.dismissAll();
        }
      }else{
        this.modalService.dismissAll();
      }
    }else{
      this.toastrService.warning("Sum of license price does not equals Final package price!!!!")
    }
    console.log("this.license_selected----",this.license_selected)
  }

  displayFn(user): string {
    return user && user.license_class ? user.license_class : '';
  }

  displayFnPackageType(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  displayFnPaymentPhase(user): string {
    return user && user[(localStorage.lang == 'ml' ? 'malay' : 'english')] ? user[(localStorage.lang == 'ml' ? 'malay' : 'english')] : '';
  }

  private _filterLicenseType(name): [] {
    console.log("name=====",name);
    const filterValue = name.toLowerCase();
    return this.licenseTypeData.filter(option => option.license_class.toLowerCase().includes(filterValue));
  }

  private _filterPackageType(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.packageTypeData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
  }

  private _filterpaymentPhase(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.paymentPhaseData.filter(option => option[this.translateVal].toLowerCase().includes(filterValue));
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


    if(this.license_selected.length > 1){
      var packageObj=this.packageTypeData.filter((elem)=>{return elem.id==1});
      this.package_type.setValue(packageObj[0])
    }else{
      var packageObj=this.packageTypeData.filter((elem)=>{return elem.id==2});
      this.package_type.setValue(packageObj[0])
    }
    // keep the autocomplete opened after each item is picked.
    requestAnimationFrame(()=>{
      this.openAuto(this.matACTrigger);
    })

  }

  
  selectedPaymentPhase(LicensePrice){
    if(this.editPackageForm.value.final_package_price != ''){
      this.finalPackageValue=this.editPackageForm.value.final_package_price;
      if(this.package_type.value.id == 1){
        this.modalService.open(LicensePrice, { ariaLabelledBy: 'modal-basic-title', size:'lg'});
        if(this.payment_phase.value.id == 2){
          this.showLi2Phase=true;
          this.showLi3Phase=false;
        }else if(this.payment_phase.value.id == 3){
          this.showLi2Phase=true;
          this.showLi3Phase=true;
        }else{
          this.showLi2Phase=false;       
          this.showLi3Phase=false;
        }
      }else{
        if(this.payment_phase.value.id == 2){
          this.show2Phase=true;
          this.show3Phase=false;
        }else if(this.payment_phase.value.id == 3){
          this.show2Phase=true;
          this.show3Phase=true;
        }else{
          this.show2Phase=false;
          this.show3Phase=false;
        }
      }
    }else{
      this.toastrService.warning("Please fill the Final package price!!");
      this.payment_phase.patchValue('')
    }
  }

  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    this.licenceInput.nativeElement.focus();
    console.log(trigger);
  }


  public validation_msgs = {
    'license_type': [
      { type: 'invalidAutocompleteObject', message: 'License Type not recognized. Click one of the options.' },
      { type: 'required', message: 'License Type is required.' }
    ],
    'package_type': [
      { type: 'invalidAutocompleteObject', message: 'Package Type not recognized. Click one of the options.' },
      { type: 'required', message: 'Package is required.' }
    ],
    'payment_phase': [
      { type: 'invalidAutocompleteObject', message: 'Payment Phase not recognized. Click one of the options.' },
      { type: 'required', message: 'Payment Phase is required.' }
    ],
  }



  goBack(){
    this.router.navigate(['/admin/package/package-list']);
  }

  changeFinalPackagePrice(){
    let discountAmt=Number(Number(this.editPackageForm.value.package_price * this.editPackageForm.value.promo_discount)/100).toFixed();
    let FinalPrice=Number(this.editPackageForm.value.package_price) - Number(discountAmt)
    this.editPackageForm.patchValue({
      final_package_price: FinalPrice
    })
    console.log(this.editPackageForm.value)
  }

  updatePackageDetails(){
    // const formData = new FormData();
    // formData.append('baseRoot','root/Package/'+this.editPackageForm.value.package_english);
    // formData.append('PackageFormData',JSON.stringify(this.editPackageForm.value));
    // formData.append('package_type',JSON.stringify(this.package_type.value));
    // formData.append('license_type',JSON.stringify(this.license_selected));
    // formData.append('payment_phase',this.payment_phase.value.id);
    // formData.append('file',this.editPackageForm.value.package_image);
    this.finalPackageValue=this.editPackageForm.value.final_package_price;
    if(this.package_type.value.id == 2){
        if(this.payment_phase.value.id == 2){
          if(this.editPackageForm.value.first_phase_amount != '' && this.editPackageForm.value.second_phase_amount != ''){
            let subAmount= Number(this.editPackageForm.value.first_phase_amount)+Number(this.editPackageForm.value.second_phase_amount);
            if(Number(this.editPackageForm.value.final_package_price)  == subAmount){
              this.spinner.show();
              this.packageService.updatePackageDetails(this.editPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
              .subscribe(res=>{
                this.spinner.hide();
                if(res['status'] == 'Success'){
                  this.toastrService.success("Updated Successfully!!");
                  this.router.navigate(['/admin/package/package-list']);
                }
                if(res['status'] == 'Session Expired'){
                  this.toastrService.error("Session Expired!!!")
                  this.router.navigate(['/authentication/signin']);
                }
              })
            }else{
              this.toastrService.error("Sum Of Phase amount does not equal Final Package price!!");
            }
          }else{
            this.toastrService.error("Please provide Phase Amounts");
          }
        }else if(this.payment_phase.value.id == 3){
          if(this.editPackageForm.value.first_phase_amount != '' && this.editPackageForm.value.second_phase_amount != '' && this.editPackageForm.value.third_phase_amount != ''){
            let subAmountThree= Number(this.editPackageForm.value.first_phase_amount)+Number(this.editPackageForm.value.second_phase_amount)+Number(this.editPackageForm.value.third_phase_amount);
            if(Number(this.editPackageForm.value.final_package_price)  == subAmountThree){
              this.spinner.show();
              this.packageService.updatePackageDetails(this.editPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
              .subscribe(res=>{
                this.spinner.hide();
                if(res['status'] == 'Success'){
                  this.toastrService.success("Updated Successfully!!");
                  this.router.navigate(['/admin/package/package-list']);
                }
                if(res['status'] == 'Session Expired'){
                  this.toastrService.error("Session Expired!!!")
                  this.router.navigate(['/authentication/signin']);
                }
              })
            }else{
              this.toastrService.error("Sum Of Phase amount does not equal Final Package price!!");
            } 
          }else{
            this.toastrService.error("Please provide Phase Amounts");
          }
        }else{
          this.spinner.show();
          this.packageService.updatePackageDetails(this.editPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
          .subscribe(res=>{
            this.spinner.hide();
            if(res['status'] == 'Success'){
              this.toastrService.success("Updated Successfully!!");
              this.router.navigate(['/admin/package/package-list']);
            }
            if(res['status'] == 'Session Expired'){
              this.toastrService.error("Session Expired!!!")
              this.router.navigate(['/authentication/signin']);
            }
          })
        }
    }
    if(this.package_type.value.id == 1){
      let TotalLicensePrice=0;
      let count=0;
      for(let i=0;i<this.license_selected.length;i++){
        let subPhaseAmt=0
        TotalLicensePrice=TotalLicensePrice+Number(this.license_selected[i].license_price);
        subPhaseAmt=subPhaseAmt + Number(Number(this.license_selected[i].first_phase_amount)+Number(this.license_selected[i].second_phase_amount)+Number(this.license_selected[i].third_phase_amount))
        console.log("subPhaseAmt------",this.license_selected[i].license_price,subPhaseAmt)
        if(this.license_selected[i].license_price != subPhaseAmt){
          count++;
        }
      }
      console.log("TotalLicensePrice---",TotalLicensePrice,this.finalPackageValue)
      if(TotalLicensePrice == this.finalPackageValue){
        if(this.payment_phase.value.id > 1){
          if(count > 0){
            this.toastrService.warning("Please check the sum of Phase amount equals the license price!!")
          }else{
            this.spinner.show();
            this.packageService.updatePackageDetails(this.editPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
            .subscribe(res=>{
              this.spinner.hide();
              if(res['status'] == 'Success'){
                this.toastrService.success("Updated Successfully!!");
                this.router.navigate(['/admin/package/package-list']);
              }
              if(res['status'] == 'Session Expired'){
                this.toastrService.error("Session Expired!!!")
                this.router.navigate(['/authentication/signin']);
              }
            })
          }
        }else{
            this.spinner.show();
            this.packageService.updatePackageDetails(this.editPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
            .subscribe(res=>{
              this.spinner.hide();
              if(res['status'] == 'Success'){
                this.toastrService.success("Updated Successfully!!");
                this.router.navigate(['/admin/package/package-list']);
              }
              if(res['status'] == 'Session Expired'){
                this.toastrService.error("Session Expired!!!")
                this.router.navigate(['/authentication/signin']);
              }
            })
        }
      }else{
        this.toastrService.warning("Sum of license price does not equals Final package price!!!!")
      }
    }
  }

}
