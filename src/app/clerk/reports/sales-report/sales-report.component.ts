import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../reports.service';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.sass']
})
export class SalesReportComponent implements OnInit {

  // regReportForm: FormGroup;
  apiURL=environment.apiUrl;

  constructor(private reportService:ReportsService,
    private toastrService:ToastrService,
    private fb: FormBuilder,private router:Router,
    private spinner:NgxSpinnerService) {

    // this.regReportForm = this.fb.group({
    //   from_date: [new Date()],
    //   to_date: [new Date()],
    // });
   }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  columns = [
    { name: 'Name' },
    { name: 'NRIC Number' },
    { name: 'Passport Number' },
    {name: 'Gender'},
    {name: 'Mobile'},
    {name: 'Email'},
    {name: 'Status'},
  ]; 

 

  data=[];
  filteredData = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  today=new Date();
  fileName= 'Sales-report-'+this.today+'.xlsx';  

  ngOnInit(): void {
    this.getCurrentDaySalesReport();
  }

  refresh() {
    this.getCurrentDaySalesReport();
  }

  getCurrentDaySalesReport(){
    this.spinner.show();
      this.reportService.getCurrentDaySalesReport()
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


  export(){
    if(this.filteredData.length > 0){
      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Sales Report - '+moment(new Date()).format('YYYY-MM-DD'),
        useBom: true,
        noDownload: false,
        headers: ["Student Name", "NRIC Number", "Passport Number","Transaction Number","Package","Payment Phase","Amount Paid"]
      };
      let fileName='Sales_Report_'+moment(new Date()).format('YYYY-MM-DD');
      console.log("this.filteredData========",this.filteredData,fileName);
      const result = this.filteredData.map(({malay,package_malay,profile_img,...rest}) => ({...rest}));
      new ngxCsv(result, fileName, options);
    }


  }

}

