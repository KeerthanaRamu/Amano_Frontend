import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../../environments/environment';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  data=[];
  filteredData = [];
  addUser:FormGroup;
  editUser:FormGroup;
  rowToDelete: any;
  submitDisable:boolean=false;
  hide = true;
  profilePreview;
  apiURL=environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private modalService: NgbModal,
    private toastrService: ToastrService,private spinner: NgxSpinnerService) { }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ngOnInit(): void {
    this.getUserList();
    this.addUser = this.fb.group({
      name: ['',Validators.required],
      user_name: ['',Validators.required],
      password: ['',Validators.required],
      role: ['3',Validators.required],
      img:['',Validators.required],
      img_name:[''],
      img_type:[''],
      mobile_no:[''],
      email_id:['']
    });

    this.editUser = this.fb.group({
      id:[''],
      name: ['',Validators.required],
      user_name: ['',Validators.required],
      password: ['',Validators.required],
      role: ['3',Validators.required],
      img:['',Validators.required],
      img_name:[''],
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




  getUserList(){
    this.spinner.show();
    this.userService.getUserList()
    .subscribe(res=>{
      this.spinner.hide();
      this.data=res;
      this.filteredData=res;
      for(let i=0;i<this.filteredData.length;i++){
        if(this.filteredData[i].img){
          this.filteredData[i].profile =this.filteredData[i].img;
        }
      }
    
      })
  }

  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' });
  }

  onFileChange(event) {
    console.log("event.target.files========",event.target.files[0])
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.addUser.patchValue({
            'img':file
          })
        }
    }
  }

  setUserDetails(){
    var formData = new FormData();
    formData.append('baseRoot','root/Employee/'+this.addUser.value.user_name);
    formData.append('UserData',JSON.stringify(this.addUser.value));
    formData.append('file',this.addUser.value.img);
    this.submitDisable=true;
    this.userService.setUserDetails(formData)
    .subscribe(res=>{
      this.submitDisable=false;
      if(res['status'] == 'Success'){
        this.toastrService.success('Created Successfully!!');
        this.getUserList();
        this.modalService.dismissAll()
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }

  editRow(row, rowIndex, content) {
    console.log("row.img----",row.profile)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:'lg' });
    this.profilePreview = row.profile;
    this.editUser.patchValue({
      id: row.id,
      name: row.name,
      user_name: row.user_name,
      password: row.password,
      role: row.role,
      img:row.img,
      mobile_no:row.mobile_no,
      email_id:row.email_id
    });  
  }

  onFileChangeUpdate(event) {
    this.profilePreview =''
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editUser.patchValue({
          'img':file
        })
      }
    }
  }

  updateUserDetails(){
    var formData = new FormData();
    formData.append('baseRoot','root/Employee/'+this.addUser.value.user_name);
    formData.append('UserData',JSON.stringify(this.editUser.value));
    formData.append('file',this.editUser.value.img);
    this.userService.updateUserDetails(formData)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success('Updated Successfully!!');
        this.getUserList();
        this.modalService.dismissAll()
      }else{
        this.toastrService.error(res['status']);
      }
    })
  }
  
  deleteRow(row,rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }

  deleteUserDetails(){
    this.userService.deleteUserDetails(this.rowToDelete)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success('Deleted Successfully!!');
        this.getUserList();
        this.modalService.dismissAll()
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
