import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../students.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.sass'],
})
export class AllStudentsComponent
  implements OnInit
{
  columns = [
    { name: 'Name' },
    { name: 'NRIC Number' },
    { name: 'Passport Number' },
    {name: 'Gender'},
    {name: 'Mobile'},
    {name: 'Email'},
  ]; 
  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  rowToDelete;
  apiURL=environment.apiUrl;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentsService: StudentService,
    private snackBar: MatSnackBar,private router: Router,
    private modalService: NgbModal,
    private toastrService:ToastrService,private spinner:NgxSpinnerService
  ) {
  }
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  
  ngOnInit() {
    this.spinner.show();
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  addNewStudent() {
    this.router.navigate(['/clerk/students/add-student'])
  }

  public loadData() {
      this.studentsService.getStudentListPerClient()
      .subscribe(res=>{
        this.spinner.hide();
        this.data=res['data'];
        this.filteredData=res['data'];
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

  editStudent(row, rowIndex){
    console.log("rowww===",row);
    this.router.navigate(['/clerk/students/edit-student',row.id]);
  }

  deleteStudent(row, rowIndex, deleteRecord){
    this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }

  deleteStudentDetails(){
    this.studentsService.deleteStudentDetails(this.rowToDelete)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.toastrService.success('Deleted Successfully!!!');
        this.modalService.dismissAll();
        this.loadData();
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
    })
    
  }

  viewStudent(row, rowIndex){
    this.router.navigate(['/clerk/students/about-student',row.id]);
  }
}
