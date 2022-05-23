import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../students.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
})
export class AllStudentsComponent
  implements OnInit
{
  columns = [
    { name: 'Name' },
    { name: 'NRIC Number' },
    { name: 'Passport Number' },
    {name : 'Enrollment Number'},
    {name: 'Gender'},
    {name: 'Mobile'},
    {name: 'Email'},
  ]; 
  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  statusList;
  updateStatusForm: FormGroup;
  rowTobeUpdated: any;
  apiURL=environment.apiUrl;
  statusDetail: any;
  showNoStatus: boolean=false;
  showStatus: boolean=false;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentsService: StudentService,
    private snackBar: MatSnackBar,private router: Router,
    private modalService: NgbModal,
    private toastrService:ToastrService,
    private fb:FormBuilder,private spinner: NgxSpinnerService
  ) {
    this.updateStatusForm = this.fb.group({
      status_id: ['',[Validators.required]],
      result: [''],
      marks:[''],
      remarks:['']
    })
  }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  
  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  addNewStudent() {
    this.router.navigate(['/admin/students/add-student'])
  }

  getStatusListPerRole(custData){
    this.studentsService.getStatusListPerRole(custData)
    .subscribe(res=>{
      if(res['data'].length > 0){
        this.showNoStatus=false;
        this.showStatus=true;
        this.statusList=res['data'];
        this.statusDetail=res['data'][0];
        console.log("statusList===",this.statusList);
      }else{
        this.showNoStatus=true;
        this.showStatus=false;
      }
      

    })
  }

  public loadData() {
      this.studentsService.getStudentListPerInstructor()
      .subscribe(res=>{
        for(let i=0;i<res['data'].length;i++){
          res['data'][i].id_number = (res['data'][i].nric_number != null ? res['data'][i].nric_number : res['data'][i].passport_number)
        }
        this.data=res['data'];
        this.filteredData=res['data'];
        console.log(" this.data==========", this.data)
      })
  }


  updateStudentStatusInfo(){
    this.spinner.show();
    console.log("status========",this.rowTobeUpdated,this.updateStatusForm.value.status_id)
    this.studentsService.updateStudentStatusInfo(this.rowTobeUpdated,this.updateStatusForm.value)
    .subscribe(res=>{
      this.spinner.hide();
      this.toastrService.success("Updated Successfully!!!");
    })
  }

  checkScheduleCompleted(){
    this.spinner.show();
    console.log("--------",this.rowTobeUpdated);
    this.studentsService.checkScheduleCompleted( this.rowTobeUpdated,this.updateStatusForm.value.status_id)
    .subscribe(res=>{
      this.spinner.hide();
      let resData=res['data'];
      console.log("resData====",resData);
      if(this.updateStatusForm.value.status_id == 8){
        if(resData[0].schedule_count != 6){
          this.toastrService.warning("KPP02 is 6 hours and it is not Completed")
          this.updateStatusForm.patchValue({status_id:''});
        }
      }else if(this.updateStatusForm.value.status_id == 9){
        if(resData[0].schedule_count != 10){
          this.updateStatusForm.patchValue({status_id:''});
          this.toastrService.warning("KPP03 is 10 hours and it is not Completed")
        }
      }else if(this.updateStatusForm.value.status_id == 11 || this.updateStatusForm.value.status_id == 12){
        if(resData[0].schedule_count != 1){
          this.updateStatusForm.patchValue({status_id:''});
          this.toastrService.warning("QTI Test is 1 hour and it is not Completed")
        }
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

  editStudent(row, rowIndex,updateStatus){
    this.modalService.open(updateStatus, { ariaLabelledBy: 'modal-basic-title' });
    this.rowTobeUpdated=row;
    console.log(row);
    this.getStatusListPerRole(row)
  }



  viewStudent(row, rowIndex){
    this.router.navigate(['/pages/students/about-student',row.id]);
  }
}
