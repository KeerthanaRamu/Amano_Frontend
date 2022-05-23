import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EmployeeService } from '../employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { Observable,map, startWith,debounceTime,switchMap,of } from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {

    
  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;


  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  license_selected= [];
  license_display=[];
  addEmployee:FormGroup;

  licenseTypeData:any;
  clientList;
  roleList:any;
  hide = true;
  imagePreview: any;
  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  
  licenseTypeList: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private employeeService:EmployeeService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private spinner:NgxSpinnerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getLicenseList();
    this.getRoleList();
    this.addEmployee = this.fb.group({
      name: ['',Validators.required],
      last_name: ['',Validators.required],
      user_name: ['',Validators.required],
      password: ['',Validators.required],
      role: ['',Validators.required],
      img_type:[''],
      img:[''],
      mobile_no:[''],
      email_id:['',[Validators.required, Validators.email, Validators.minLength(5)]]
    });
  }

  getRoleList(){
    this.employeeService.getRoleList()
    .subscribe(res=>{
      console.log("client--------",res);
      this.roleList=res;
    })
  }

  getLicenseList(){
    this.employeeService.getLicenseClassList()
    .subscribe(res=>{
      console.log("client--------",res);
      this.licenseTypeData=res['data'];
      console.log("this.this.license_type=========",this.license_type);
      this.licenseTypeList = this.license_type.valueChanges.pipe(
        startWith(''),
        map((fruit: string | null) => fruit ? this._filterLicenseType(fruit) : this.licenseTypeData.slice()));
    })
  }

  displayFn(user): string {
    return user && user.license_class ? user.license_class : '';
  }

  private _filterLicenseType(name): [] {
    console.log("name=====",name);
    const filterValue = name.toLowerCase();
    return this.licenseTypeData.filter(option => option.license_class.toLowerCase().includes(filterValue));
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
    // const index = this.license_selected.indexOf(license);

    // if (index >= 0) {
    //   this.license_selected.splice(index, 1);
    // } 
    
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

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addEmployee.patchValue({
          'img':file
        })
      }
  }
}   

setEmployeeDetails(){
  var formData = new FormData();
  formData.append('baseRoot','root/Employee/'+this.addEmployee.value.user_name);   
  formData.append('UserData',JSON.stringify(this.addEmployee.value));
  formData.append('license_type',JSON.stringify(this.license_selected));
  formData.append('file',this.addEmployee.value.img);
  if(this.addEmployee.value.role == 5 || this.addEmployee.value.role == 6){
    if(this.license_selected.length > 0){
      this.spinner.show();
      this.employeeService.setEmployeeDetails(formData)
      .subscribe(res=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          this.toastrService.success('Created Successfully!!');
          this.modalService.dismissAll();
          this.router.navigate(['/admin/employee/employee-list'])
        }else if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }else{
          this.toastrService.error(res['status']);
        }
      })
    }else{
      this.toastrService.warning("Please Select the License Class!!");
    }
  }else{
    this.spinner.show();
    this.employeeService.setEmployeeDetails(formData)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Created Successfully!!');
        this.modalService.dismissAll();
        this.router.navigate(['/admin/employee/employee-list'])
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }
}

backToEmployeeList(){
  this.router.navigate(['/admin/employee/employee-list'])
}


}
