import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {PackageService} from '../package.service'
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../core/service/language.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as moment from 'moment';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.sass']
})

export class PackageListComponent implements OnInit {

  columns = [
    { name: 'License Type' },
    { name: 'Package Type' },
    { name: 'Final Package Price' },
    {name: 'Payment Phase'},
    {name: 'Global View'},
  ]; 
  
  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  rowToDelete;
  
  constructor(  public httpClient: HttpClient,
    public dialog: MatDialog,
    public packageService: PackageService,
    private snackBar: MatSnackBar,private router: Router, private modalService: NgbModal,
  private toastrService:ToastrService,private languageService:LanguageService,
  private spinner:NgxSpinnerService) { }

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
    addNewPackage() {
      this.router.navigate(['/admin/package/add-package'])
    }

    loadData(){
        this.spinner.show();
        this.packageService.getPackageListPerClient()
        .subscribe(res=>{
          this.spinner.hide();
          console.log("Pack data!!!!!!!!",res['data'])
          for(let i=0;i<res['data'].length;i++){
            res['data'][i].global_view = res['data'][i]['global_view'] == 1 ? true : false;
            res['data'][i].package_type = res['data'][i][this.translateVal];
            res['data'][i].payment_phase = res['data'][i]['phase_'+this.translateVal];
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

  editPackage(row, rowIndex){
      console.log("rowww===",row);
      this.router.navigate(['/admin/package/edit-package',row.id]);
  }

  deletePackage(row, rowIndex,deleteRecord){
    this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
    this.rowToDelete=row;
  }

  deletePackageDetails(){
    this.spinner.show();
    this.packageService.deletePackageDetails(this.rowToDelete)
    .subscribe(res=>{
      this.spinner.hide();
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

  exportToExcel(){
    console.log("this.filteredData==========",this.filteredData)
    if(this.filteredData.length > 0){
      this.spinner.show();
      this.packageService.getPackageInfoToExport()
      .subscribe(res=>{
          this.spinner.hide();
          var options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Package List',
            useBom: true,
            noDownload: false,
            headers: ["Package Type","Package Offers","Package English","Package Malay","Payment Phase","License Type","License Price","First Phase Amount","Second Phase Amount","Third Phase Amount","Package Price","Promo Discount","Final Package Price","Package Description in English","Package Description in Malay","Package Phase Description in English","Package Phase Description in Malay","Global View"]
          };
          let fileName='Package List';
          console.log("this.filteredData========",this.filteredData,fileName);
          for(let i=0;i<res['data'].length;i++){
            res['data'][i].first_phase_amount=res['data'][i].first_phase_amount == null ? 0 : res['data'][i].first_phase_amount;
            res['data'][i].second_phase_amount=res['data'][i].second_phase_amount == null ? 0 : res['data'][i].second_phase_amount;
            res['data'][i].third_phase_amount=res['data'][i].third_phase_amount == null ? 0 : res['data'][i].third_phase_amount;
            res['data'][i].global_view=res['data'][i].global_view == 1 ? true : false;
            res['data'][i].package_desc_english=(res['data'][i].package_desc_english).replace(/<(.|\n)*?>/g, "");
            res['data'][i].package_desc_malay=(res['data'][i].package_desc_malay).replace(/<(.|\n)*?>/g, "");
            res['data'][i].package_phase_desc_english=(res['data'][i].package_phase_desc_english).replace(/<(.|\n)*?>/g, "");
            res['data'][i].package_phase_desc_malay=(res['data'][i].package_phase_desc_malay).replace(/<(.|\n)*?>/g, "");

          }
          const result = res['data'];
          console.log("result======",result)
          new ngxCsv(result, fileName, options);
      })
    }

  }

}
