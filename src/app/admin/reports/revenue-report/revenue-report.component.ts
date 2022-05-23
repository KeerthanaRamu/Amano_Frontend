import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../reports.service';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.sass']
})
export class RevenueReportComponent implements OnInit {

  regReportForm: FormGroup;

  constructor(private reportService:ReportsService,private toastrService:ToastrService,
    private fb: FormBuilder,private spinner: NgxSpinnerService) {

    this.regReportForm = this.fb.group({
      from_date: [new Date()],
      to_date: [new Date()],
    });
   }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  columns = [
    { name: 'Student Name' },
    { name: 'Transaction Number' },
    { name: 'Package' },
    {name: 'Package Type'},
    {name: 'Package Amount'},
    {name: 'Payment Status'},
    {name: 'Amount Paid'},
    {name: 'Status'},
  ]; 
  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');

  ngOnInit(): void {
    this.getRevenueReportForAdmin();
  }

  refresh() {
   this.getRevenueReportForAdmin();
  }

  getRevenueReportForAdmin(){
    this.spinner.show();
    console.log("this.regReportForm.value===",this.regReportForm.value)
      this.reportService.getRevenueReportForAdmin(this.regReportForm.value)
      .subscribe((res)=>{
        this.spinner.hide();
        for(let i=0;i<res['data'].length;i++){
          res['data'][i].package_english = res['data'][i]['package_'+this.translateVal];
          res['data'][i].english = res['data'][i][this.translateVal];
        }
        this.data=res['data'];
        this.filteredData=res['data'];
      })
  }

  getRevenueReport(){
    this.getRevenueReportForAdmin();
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


  exportToExcel(){
    if(this.filteredData.length > 0){
      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Revenue Report - '+moment(new Date()).format('YYYY-MM-DD'),
        useBom: true,
        noDownload: false,
        headers: ["Student Name", "Transaction No", "Package","Payment Phase","Package Amount","License","Amount Paid","Status"]
      };
      let fileName='Revenue_Report_'+moment(new Date()).format('YYYY-MM-DD');
      console.log("this.filteredData========",this.filteredData,fileName);
      const result = this.filteredData.map(({id,malay,package_malay,...rest}) => ({...rest}));
      console.log("result======",result)
      new ngxCsv(result, fileName, options);
    }

  }

}
