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
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  license_selected= [];

  data=[];
  filteredData = [];
  editEmployee:FormGroup;
  rowToDelete: any;
  roleList:any;
  apiURL = environment.apiUrl;
  licenseTypeData:any;

  clientList;
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
    private router:Router) { }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ngOnInit(): void {
    this.getEmployeeList();
    this.getRoleList();
    this.editEmployee = this.fb.group({
      id:[''],
      name: ['',Validators.required],
      last_name:['',Validators.required],
      user_name: ['',Validators.required],
      password: ['',Validators.required],
      role: ['',Validators.required],
      img:['',Validators.required],
      img_type:[''],
      mobile_no:[''],
      email_id:['']
    });
  }

  columns = [
    { name: 'Name' },
    { name: 'User Name' },
    { name: 'Role' },
  ]; 

  
  getEmployeeList(){
    this.employeeService.getEmployeeList()
    .subscribe(res=>{
      console.log("empppppp--------",res);
      this.data=res;
      this.filteredData=res;
    })
  }

  addRow() {
    this.router.navigate(['/admin/employee/add-employee'])
  }

  getRoleList(){
    this.employeeService.getRoleList()
    .subscribe(res=>{
      console.log("client--------",res);
      this.roleList=res;
    })
  }

  editRow(row, rowIndex, content) {
    this.imagePreview='';
    console.log("row---------",row)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:'lg' });
    this.editEmployee.patchValue({
      id: row.id,
      name: row.name,
      last_name:row.last_name,
      user_name: row.user_name,
      password: row.password,
      role: row.role_id,
      img:row.img,
      mobile_no:row.mobile_no,
      email_id:row.email_id,
    });  
    this.license_selected=row.license_list;
    this.imagePreview=row.img;
  }

  onFileChangeUpdate(event) {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.editEmployee.patchValue({
            'img':file
          })
        }
    }
  }

  updateEmployeeDetails(){
    this.spinner.show();
    var formData = new FormData();
    formData.append('baseRoot','root/Employee/'+this.editEmployee.value.user_name);
    formData.append('UserData',JSON.stringify(this.editEmployee.value));
    formData.append('file',this.editEmployee.value.img);
    this.employeeService.updateUserDetails(formData)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Updated Successfully!!');
        this.getEmployeeList();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }
  
  deleteRow(row,rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }

  deleteEmployeeDetails(){
    this.spinner.show();
    this.employeeService.deleteEmployeeDetails(this.rowToDelete)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.toastrService.success('Deleted Successfully!!');
        this.getEmployeeList();
        this.modalService.dismissAll()
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }

  filterDatatable(event) {
      // get the value of the key pressed and make it lowercase
      const val = event.target.value.toLowerCase();
      // get the amount of columns in the table
      const colsAmt = this.columns.length;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.filteredData[0]);
      // assign filtered matches to the active datatable
      this.data = this.filteredData.filter(function (item) {
        // iterate through each row's column data
        for (let i = 0; i < colsAmt; i++) {
          // check for a match
          if (
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
            !val
          ) {
            // found match, return true to add to result set
            return true;
          }
        }
      });
      // whenever the filter changes, always go back to the first page
      this.table.offset = 0;
  }

}
