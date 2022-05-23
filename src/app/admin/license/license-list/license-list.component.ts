import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {LicenseService} from '../license.service'
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageService } from '../../../core/service/language.service';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.scss']
})



export class LicenseListComponent implements OnInit {

  columns = [
    { name: 'License Class' },
    { name: 'Minimum Age' },
    { name: 'License Description' },
    { name: 'Actions' }
  ]; 
  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  rowToDelete;

  constructor(  public httpClient: HttpClient,
    public dialog: MatDialog,
    public licenseService: LicenseService,
    private snackBar: MatSnackBar,private router: Router,
    private modalService: NgbModal,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService,private languageService:LanguageService) { }


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
    addNewLicense() {
      this.router.navigate(['/admin/license/add-license'])
    }

    loadData(){
      this.spinner.show();
        this.licenseService.getLicenseListPerClient()
        .subscribe(res=>{
          this.spinner.hide();
          for(let i=0;i<res['data'].length;i++){
            res['data'][i].license_desc= res['data'][i]['license_desc_'+this.translateVal]
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

  editLicense(row,rowIndex){
    console.log("rowww===",row);
    this.router.navigate(['/admin/license/edit-license',row.id]);
  }

  deleteLicense(row,rowIndex,deleteRecord){
    this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }


  deleteLicensDetails(){
    this.licenseService.deleteLicenseDetails(this.rowToDelete)
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


}
