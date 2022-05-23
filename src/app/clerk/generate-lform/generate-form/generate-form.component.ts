import { Component, OnInit } from '@angular/core';
import { GenerateLFormService } from '../generate-lform.service'; 
import { ToastrService } from 'ngx-toastr';
import {  FormBuilder, FormGroup } from '@angular/forms';
import {printLForm} from '../print-form';
import { LanguageService } from 'src/app/core/service/language.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.scss']
})
export class GenerateFormComponent implements OnInit {

  regReportForm: FormGroup;
  statusList:any;
  data: any;
  selected = [];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');

  columns = [
    { name: 'Name' },
    { name: 'NRIC Number' },
    { name: 'Passport Number' },
    {name: 'Gender'},
    {name: 'Mobile'},
    {name: 'Email'},
    {name: 'Status'},
  ]; 

  constructor(private generateFormService:GenerateLFormService,
    private toastrService:ToastrService,
    private fb: FormBuilder,
    private languageService:LanguageService,
    private router:Router,
    private spinner:NgxSpinnerService) {
      
    this.regReportForm = this.fb.group({
      from_date: [],
      to_date: [],
      status:[''] 
    });
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
    })
   }

  ngOnInit(): void {
    this.getStatusList();
  }

  getStatusList(){
    this.generateFormService.getStatusList()
    .subscribe(res=>{
      this.statusList=res;
      console.log("----",this.statusList)
    })
  }

  

  getLformFilterData(){
    this.spinner.show();
    this.selected=[];
    this.generateFormService.getLformFilterData(this.regReportForm.value)
    .subscribe(res=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          this.data=res['data'];
          console.log("res['data']=========",res['data'])
          if(res['data'].length > 0){
            for(let i=0;i<this.data.length;i++){
              this.data[i].package_name = this.data[i]['package_'+this.translateVal];
              this.data[i].nricNo = (this.data[i].nric_number != null ?  this.data[i].nric_number : this.data[i].passport_number);
              this.data[i].plaeBirth = this.data[i]['place_'+this.translateVal];
            }
          }else{
            this.toastrService.error("No Data Found!!!")
          }
          
        }
        if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
    })
  }


  getDateFilteredData(){
    this.spinner.show();
    this.selected=[];
    this.generateFormService.getDateFilteredData(this.regReportForm.value)
    .subscribe(res=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          this.data=res['data'];
          console.log("res['data']=========",res['data'])
          if(res['data'].length > 0){
            for(let i=0;i<this.data.length;i++){
              this.data[i].package_name = this.data[i]['package_'+this.translateVal];
              this.data[i].nricNo = (this.data[i].nric_number != null ?  this.data[i].nric_number : this.data[i].passport_number);
              this.data[i].plaeBirth = this.data[i]['place_'+this.translateVal];
            }
          }else{
            this.toastrService.error("No Data Found!!!")
          }
          
        }
        if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
    })
  }

  exportToExcel(){
    console.log("this.filteredData==========",this.data)
    if(this.data.length > 0){
        var options = { 
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true, 
          showTitle: true,
          title: 'Student List',
          useBom: true,
          noDownload: false,
          headers: ["Name","IC Number","Passport Number","Email Address","Mobile Number","License Class"]
        };
        let fileName='Student List';
        console.log("this.filteredData========",this.data,fileName);
        const result = this.data.map(({id,nric_type,date_of_birth,gender,placebirth_id,nationality_id,address_nric,postalcode_id,city,state,race_id,final_price,package_id,enrollment_no,package_english,package_malay,package_price,postal_code,place_english,place_malay,package_name,nricNo,plaeBirth,...rest}) => ({...rest}));
        console.log("result======",result)
        new ngxCsv(result, fileName, options);
    }

  }


  onCheckboxChangeFn(event){
    console.log("event----",event);
  }


  printL1Page(){
    console.log("this.selected======",this.selected);
    if(this.selected.length > 0){
      setTimeout(()=>{
        printLForm('printL1Form');
      },1000)
    }else{
      this.toastrService.warning("No Students Selected!!")
    }
  }

  printL8Page(){
    if(this.selected.length > 0){
      setTimeout(()=>{
        printLForm('printL8Form');
      },1000)
    }else{
      this.toastrService.warning("No Students Selected!!")
    }
  }

 
 

}
