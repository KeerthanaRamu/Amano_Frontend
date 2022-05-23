import { Component, OnInit,ViewChild,ChangeDetectorRef,ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of } from 'rxjs';
import { LanguageService } from '../../../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PackageService} from '../package.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
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
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  license_selected= [];
  license_display=[];
  show2Phase=false;
  show3Phase=false;
  showLi2Phase=false;
  showLi3Phase=false;
  addPackageForm:FormGroup;
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  
  licenseTypeData:any;
  packageTypeData:any;
  paymentPhaseData:any;

  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  package_type= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });  
  payment_phase= new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] });  
  license_price=new FormControl('', { validators:[Validators.required] });  

  licenseTypeList: Observable<string[]>;
  packageTypeList: Observable<string[]>;
  paymentPhaseList: Observable<string[]>;

  public Editor = ClassicEditor;
  finalPackageValue: any;
  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,private packageService:PackageService,
    private router:Router, private spinner:NgxSpinnerService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
      this.getPackageTypeList();
      this.getLicenseClassList();
      this.getPaymentPhases();

    this.addPackageForm = this.fb.group({
      package_price: ['', Validators.required],
      package_offers:['', Validators.required],
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

    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      this.getPackageTypeList();
      this.getLicenseClassList();
      this.getPaymentPhases();
    })
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
    alert("hii")
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
    console.log("license====",license)
    const index1= this.license_display.indexOf(license)
    if (index1 >= 0) {
      this.license_display.splice(index1, 1);
    }    
    this.license_selected=this.license_selected.filter(value=>value.license_class != license);
    console.log("license_selected====",this.license_selected);
    this.payment_phase.patchValue('');

    this.addPackageForm.patchValue({
      first_phase_amount:0,
      second_phase_amount:0,
      third_phase_amount:0
    });

    this.show2Phase=false;
    this.show3Phase=false;

    if(this.license_selected.length > 1){
      var packageObj=this.packageTypeData.filter((elem)=>{return elem.id==1});
      this.package_type.setValue(packageObj[0]);
    }else{
      var packageObj=this.packageTypeData.filter((elem)=>{return elem.id==2});
      this.package_type.setValue(packageObj[0]);
    }  
  }

  selectedListType(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.value.license_class;
    console.log("newValue=======",event.option,this.license_selected.length);
    
      if(this.license_display.includes(newValue)) {
        this.license_display = [...this.license_display.filter(fruit=>fruit !== newValue)];
        this.license_selected = [...this.license_selected.filter(fruit=>fruit.id !== event.option.value.id)];
      }else {
        if(this.license_selected.length <= 1){
          this.license_display.push(newValue)
          this.license_selected.push({
            id:event.option.value.id,
            license_class:event.option.value.license_class,
            license_price:0,
            first_phase:0,
            second_phase:0,
            third_phase:0
          });
        }else{
          this.toastrService.warning('Only two is Allowed!!')
        }
      }
      
      this.payment_phase.patchValue('');
      this.addPackageForm.patchValue({
        first_phase_amount:0,
        second_phase_amount:0,
        third_phase_amount:0
      });
      
      this.show2Phase=false;
      this.show3Phase=false;

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
      console.log("---final----",this.license_selected)
  }

  setLicensePrice(){
    let TotalLicensePrice=0;
    let count=0;
    for(let i=0;i<this.license_selected.length;i++){
      let subPhaseAmt=0
      TotalLicensePrice=TotalLicensePrice+Number(this.license_selected[i].license_price);
      subPhaseAmt=subPhaseAmt + Number(Number(this.license_selected[i].first_phase)+Number(this.license_selected[i].second_phase)+Number(this.license_selected[i].third_phase))
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

  selectedPaymentPhase(LicensePrice){
    if(this.addPackageForm.value.final_package_price != ''){
      this.finalPackageValue=this.addPackageForm.value.final_package_price;
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
      { type: 'required', message: 'Package Type is required.' }
    ],
    'payment_phase': [
      { type: 'invalidAutocompleteObject', message: 'Payment Phase not recognized. Click one of the options.' },
      { type: 'required', message: 'Payment Phase is required.' }
    ],
  }

  setPackageDetails(){
    console.log("this.addPackageForm.value====",this.addPackageForm.value,this.package_type,this.license_selected)
    // const formData = new FormData();
    // formData.append('baseRoot','root/Package/'+this.addPackageForm.value.package_english);
    // formData.append('PackageFormData',JSON.stringify(this.addPackageForm.value));
    // formData.append('package_type',JSON.stringify(this.package_type.value));
    // formData.append('license_type',JSON.stringify(this.license_selected));
    // formData.append('payment_phase',this.payment_phase.value.id);
    // formData.append('file',this.addPackageForm.value.package_image);
    if(this.package_type.value.id == 2){
        if(this.payment_phase.value.id == 2){
          if(this.addPackageForm.value.first_phase_amount != '' && this.addPackageForm.value.second_phase_amount != ''){
            let subAmount= Number(this.addPackageForm.value.first_phase_amount)+Number(this.addPackageForm.value.second_phase_amount);
            if(Number(this.addPackageForm.value.final_package_price)  == subAmount){
              this.spinner.show();
              this.packageService.setPackageDetails(this.addPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
              .subscribe(res=>{
                this.spinner.hide();
                if(res['status'] == 'Success'){
                  this.toastrService.success("Registered Successfully!!");
                  this.addPackageForm.reset();
                  this.router.navigate(['/admin/package/package-list']);
                }else if(res['status'] == 'Session Expired'){
                  this.toastrService.error("Session Expired!!!")
                  this.router.navigate(['/authentication/signin']);
                }else{
                  this.toastrService.error(res['status']);
                }
              })
            }else{
              this.toastrService.error("Sum Of Phase amount does not equal Final Package price!!");
            }
          }else{
            this.toastrService.error("Please provide Phase Amounts");
          }
        }else if(this.payment_phase.value.id == 3){
          if(this.addPackageForm.value.first_phase_amount != '' && this.addPackageForm.value.second_phase_amount != '' && this.addPackageForm.value.third_phase_amount != ''){
            let subAmountThree= Number(this.addPackageForm.value.first_phase_amount)+Number(this.addPackageForm.value.second_phase_amount)+Number(this.addPackageForm.value.third_phase_amount);
            if(Number(this.addPackageForm.value.final_package_price)  == subAmountThree){
              this.spinner.show();
              this.packageService.setPackageDetails(this.addPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
              .subscribe(res=>{
                this.spinner.hide();
                if(res['status'] == 'Success'){
                  this.toastrService.success("Registered Successfully!!");
                  this.addPackageForm.reset();
                  this.router.navigate(['/admin/package/package-list']);
                }else if(res['status'] == 'Session Expired'){
                  this.toastrService.error("Session Expired!!!")
                  this.router.navigate(['/authentication/signin']);
                }else{
                  this.toastrService.error(res['status']);
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
          this.packageService.setPackageDetails(this.addPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
          .subscribe(res=>{
            this.spinner.hide();
            if(res['status'] == 'Success'){
              this.toastrService.success("Registered Successfully!!");
              this.addPackageForm.reset();
              this.router.navigate(['/admin/package/package-list']);
            }else if(res['status'] == 'Session Expired'){
              this.toastrService.error("Session Expired!!!")
              this.router.navigate(['/authentication/signin']);
            }else{
              this.toastrService.error(res['status']);
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
        subPhaseAmt=subPhaseAmt + Number(Number(this.license_selected[i].first_phase)+Number(this.license_selected[i].second_phase)+Number(this.license_selected[i].third_phase))
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
            this.packageService.setPackageDetails(this.addPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
            .subscribe(res=>{
              this.spinner.hide();
              if(res['status'] == 'Success'){
                this.toastrService.success("Registered Successfully!!");
                this.addPackageForm.reset();
                this.router.navigate(['/admin/package/package-list']);
              }else if(res['status'] == 'Session Expired'){
                this.toastrService.error("Session Expired!!!")
                this.router.navigate(['/authentication/signin']);
              }else{
                this.toastrService.error(res['status']);
              }
            })
          }
        }else{
          this.spinner.show();
          this.packageService.setPackageDetails(this.addPackageForm.value,this.package_type.value,this.license_selected,this.payment_phase.value.id)
          .subscribe(res=>{
            this.spinner.hide();
            if(res['status'] == 'Success'){
              this.toastrService.success("Registered Successfully!!");
              this.addPackageForm.reset();
              this.router.navigate(['/admin/package/package-list']);
            }else if(res['status'] == 'Session Expired'){
              this.toastrService.error("Session Expired!!!")
              this.router.navigate(['/authentication/signin']);
            }else{
              this.toastrService.error(res['status']);
            }
          })
        }
      }else{
        this.toastrService.warning("Sum of license price does not equals Final package price!!!!")
      }
    }
  }


  goBack(){
    this.router.navigate(['/admin/package/package-list']);
  }

  changeFinalPackagePrice(){
    let discountAmt=Number(Number(this.addPackageForm.value.package_price * this.addPackageForm.value.promo_discount)/100).toFixed();
    let FinalPrice=Number(this.addPackageForm.value.package_price) - Number(discountAmt)
    this.addPackageForm.patchValue({
      final_package_price: FinalPrice
    })
    console.log(this.addPackageForm.value)
  }
}