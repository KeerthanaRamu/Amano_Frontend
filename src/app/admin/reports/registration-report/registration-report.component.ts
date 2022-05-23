import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../reports.service';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {  FormBuilder, FormGroup} from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registration-report',
  templateUrl: './registration-report.component.html',
  styleUrls: ['./registration-report.component.sass']
})
export class RegistrationReportComponent implements OnInit {

  regReportForm: FormGroup;
  apiURL=environment.apiUrl;
  
  constructor(private reportService:ReportsService,
    private toastrService:ToastrService,
    private fb: FormBuilder,
    private spinner:NgxSpinnerService) {

    this.regReportForm = this.fb.group({
      from_date: [new Date()],
      to_date: [new Date()],
    });
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

  ngOnInit(): void {
    this.getRegistrationReportForAdmin();
  }

  refresh() {
    this.getRegistrationReportForAdmin();
  }

  getRegistrationReportForAdmin(){
    this.spinner.show();
    console.log("this.regReportForm.value===",this.regReportForm.value)
      this.reportService.getRegistrationReportForAdmin(this.regReportForm.value)
      .subscribe((res)=>{
        this.spinner.hide();
        for(let i=0;i<res['data'].length;i++){
          res['data'][i].nric_english = res['data'][i]['nric_'+this.translateVal];
          res['data'][i].placebirth_english = res['data'][i]['placebirth_'+this.translateVal];
          res['data'][i].race_english = res['data'][i]['race_'+this.translateVal];
          res['data'][i].pref_english = res['data'][i]['pref_'+this.translateVal];
          res['data'][i].english = res['data'][i][this.translateVal];
        }
        this.data=res['data'];
        this.filteredData=res['data'];
      })
  }

  getRegistrationReport(){
    this.getRegistrationReportForAdmin();
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
        title: 'Registration Report - '+moment(new Date()).format('YYYY-MM-DD'),
        useBom: true,
        noDownload: false,
        headers: ["Student Name","NRIC Type","NRIC Number", "Passport Number","Date Of Birth","Gender","Place Of Birth","Nationality","NRIC Address","Address 1","Address 2","Postal Code","City","State","Email Address","Moile Number","Race","Other Race","Prefered Language","Emergency Contact Name","Emergency Contact Number","Username","Password"]
      };
      let fileName='Registration_Report_'+moment(new Date()).format('YYYY-MM-DD');
      console.log("this.filteredData========",this.filteredData,fileName);
      const result = this.filteredData.map(({id,profile_img,nric_malay,placebirth_malay,race_malay,pref_malay,english,...rest}) => ({...rest}));
      new ngxCsv(result, fileName, options);
    }
    
  }
}
