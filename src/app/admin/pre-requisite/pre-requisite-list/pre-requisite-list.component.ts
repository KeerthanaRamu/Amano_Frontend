import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {PreRequisiteService} from '../pre-requisite.service'
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../core/service/language.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pre-requisite-list',
  templateUrl: './pre-requisite-list.component.html',
  styleUrls: ['./pre-requisite-list.component.sass']
})
export class PreRequisiteListComponent implements OnInit {

  columns = [
    { name: 'License Code' },
    { name: 'License Type' },
  ]; 
  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  rowToDelete;
  
  constructor(  public httpClient: HttpClient,
    public dialog: MatDialog,
    public preRequisiteService: PreRequisiteService,
    private snackBar: MatSnackBar,private router: Router, private modalService: NgbModal,
    private spinner:NgxSpinnerService,private languageService:LanguageService,
  private toastrService:ToastrService) { }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  
  ngOnInit() {
    this.loadData();
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      this.loadData();
    })
  }
  refresh() {
    this.loadData();
  }
  addNewPreRequisite() {
    this.router.navigate(['/admin/pre-requisite/add-pre-requisite'])
  }

  loadData(){
    this.spinner.show();
      this.preRequisiteService.getPreRequisitesDetails()
      .subscribe(res=>{
        console.log("res['data']=========",res['data'])
        this.spinner.hide();
        for(let i=0;i<res['data'].length;i++){
          res['data'][i].license_type = res['data'][i][this.translateVal];
        }
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

editPreRequisite(row,rowIndex){
  console.log("rowww===",row);
  this.router.navigate(['/admin/pre-requisite/edit-pre-requisite',row.license_type_id]);
}

deletePreRequisite(row,rowIndex,deleteRecord){
  this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
  this.rowToDelete=row;
}

deletePrequisitesDetails(){
  this.spinner.show();
  this.preRequisiteService.deletePrequisitesDetails(this.rowToDelete)
  .subscribe(res=>{
    this.spinner.hide();
    if(res['status'] == 'Session Expired'){
      this.toastrService.error("Session Expired!!!")
      this.router.navigate(['/authentication/signin']);
    }else{
      this.toastrService.success("Deleted Successfully!!!");
      this.modalService.dismissAll();
      this.loadData();
    }
   
  })
}

}
