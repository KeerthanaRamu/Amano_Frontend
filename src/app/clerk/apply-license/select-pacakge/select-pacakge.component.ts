import { Component, OnInit } from '@angular/core';
import { ApplyLicenseService } from '../apply-license.service';
import { LanguageService } from 'src/app/core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import * as crypto from 'crypto-js';
import {ReceiptDialogComponent} from '../receipt-dialog/receipt-dialog.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-pacakge',
  templateUrl: './select-pacakge.component.html',
  styleUrls: ['./select-pacakge.component.css']
})
export class SelectPacakgeComponent implements OnInit {

  licenseSelected;
  nricInfo;
  passportInfo;
  existingLicenseInfo;
  licenseInfo;
  packageInfo;
  licenseFlowImage : Array<object>;
  expiry_date;
  existing_license_front;
  existing_license_rear;
  licenseClassList:any[];
  currentIndex: any = -1;
  showFlag: any = false;
  handler: any;
  dialogRef: MatDialogRef<any>;

  payment_type=new FormControl('Cash');
  reference_no=new FormControl('');

  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  studInfo: any;
  packDetails: any;
  payamount: any;
  GDL_License: any;
  PSV_License: any;
  cdl_license: any;
  disableReference: boolean=true;

  
  constructor(private applyLicenseService:ApplyLicenseService,private toastrService:ToastrService,
    private spinner:NgxSpinnerService,public dialog: MatDialog,
    private  languageService:LanguageService,private router:Router,
    private modalService: NgbModal) {
    // this.licenseSelected=JSON.parse(localStorage.licenseData);
    // this.licenseInfo=JSON.parse(localStorage.licenseObj);
    // this.nricInfo=JSON.parse(localStorage.nric_number);
    // this.passportInfo=JSON.parse(localStorage.passport_number);
    // this.existingLicenseInfo=JSON.parse(localStorage.existing_license);

    let licenseData=this.applyLicenseService.getSelectedLicenseInfo();
    if(licenseData){
      console.log("licenseData---0000----",licenseData)
      this.licenseSelected=licenseData.licenseInfo;
      this.expiry_date=licenseData.expiry_date;
      this.nricInfo=licenseData.nric_number;
      this.passportInfo=licenseData.passport_number;
      this.existingLicenseInfo=licenseData.existing_license;
      this.existing_license_front=licenseData.existing_license_front;
      this.existing_license_rear=licenseData.existing_license_rear;
      this.GDL_License=licenseData.GDL_License;
      this.PSV_License=licenseData.PSV_License;
      this.cdl_license=licenseData.cdl_license;
    }else{
      this.router.navigate(['/clerk/apply/license']);

    }
   }

  ngOnInit(): void {
    console.log("licenseSelected===",this.licenseSelected);
    this.spinner.show();
    let licenseList=[];
    for(let i=0;i<this.licenseSelected.length;i++){
      licenseList.push(this.licenseSelected[i].id);
    }
    console.log("this.existingLicenseInfo-----",this.existingLicenseInfo)
    if(licenseList.length>0){
      this.applyLicenseService.getPackageInfoForLicense(this.existingLicenseInfo,this.cdl_license,licenseList)
      .subscribe((res)=>{
        this.spinner.hide();
          console.log("res===package===",res);
          if(res['status'] == 'Success'){
            this.packageInfo=res['data'];
            for(let i=0;i<this.packageInfo.length;i++){
              console.log("this.packageInfo[i].licenseList-------------",this.packageInfo[i].licenseList)
              this.packageInfo[i].licensePrefix='';
              this.packageInfo[i].package_title=this.packageInfo[i]['package_'+this.translateVal];
              this.packageInfo[i].package_desc=this.packageInfo[i]['package_desc_'+this.translateVal];
              this.packageInfo[i].package_phase_desc=this.packageInfo[i]['package_phase_desc_'+this.translateVal];
              if(this.packageInfo[i].licenseList.length > 0){
                this.packageInfo[i].licenseClasses=[];
                this.packageInfo[i].licenseIdList=[]
                for(let j=0;j<this.packageInfo[i].licenseList.length;j++){
                  this.packageInfo[i].licensePrefix=this.packageInfo[i].licensePrefix+'-'+this.packageInfo[i].licenseList[j].license_class;
                  this.packageInfo[i].licenseClasses.push(this.packageInfo[i].licenseList[j].license_class);
                  this.packageInfo[i].licenseIdList.push(this.packageInfo[i].licenseList[j].licenseid)
                  for(let k=0;k<this.licenseSelected.length;k++){
                    if(this.licenseSelected[k].id == this.packageInfo[i].licenseList[j].licenseid){
                      this.packageInfo[i].licenseList[j].license_category=this.licenseSelected[k].license_category;
                    }else{
                      this.packageInfo[i].licenseList[j].license_category=null;
                    }
                  }
                }
              }
            }
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
    }

    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
      if(this.packageInfo.length > 0){
        for(let i=0;i<this.packageInfo.length;i++){
          console.log("this.packageInfo[i].licenseList-------------",this.packageInfo[i].licenseList)
          this.packageInfo[i].licensePrefix='';
          this.packageInfo[i].package_title=this.packageInfo[i]['package_'+this.translateVal];
          this.packageInfo[i].package_desc=this.packageInfo[i]['package_desc_'+this.translateVal];
          this.packageInfo[i].package_phase_desc=this.packageInfo[i]['package_phase_desc_'+this.translateVal];
          if(this.packageInfo[i].licenseList.length > 0){
            this.packageInfo[i].licenseClasses=[];
            this.packageInfo[i].licenseIdList=[]
            for(let j=0;j<this.packageInfo[i].licenseList.length;j++){
              this.packageInfo[i].licensePrefix=this.packageInfo[i].licensePrefix+'-'+this.packageInfo[i].licenseList[j].license_class;
              this.packageInfo[i].licenseClasses.push(this.packageInfo[i].licenseList[j].license_class);
              this.packageInfo[i].licenseIdList.push(this.packageInfo[i].licenseList[j].licenseid);
              for(let k=0;k<this.licenseSelected.length;k++){
                if(this.licenseSelected[k].id == this.packageInfo[i].licenseList[j].licenseid){
                  this.packageInfo[i].licenseList[j].license_category=this.licenseSelected[k].license_category;
                }else{
                  this.packageInfo[i].licenseList[j].license_category=null;
                }
              }
            }
          }
        }
      }
           
    })
    
  }


  viewPackageImage(packDt){
    packDt['packageStage']="Apply";
   this.applyLicenseService.setPackageInfoForFlowImage(packDt);
   this.router.navigate(['/clerk/apply/package-flow'])
  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }


  setCustomerPackageDetails(packDt,showPay){
    this.spinner.show();
    console.log("packDt=============",packDt)
    let first_phase_amt=0;
    for(let i=0;i<packDt.licenseList.length;i++){
      first_phase_amt=first_phase_amt+Number(packDt.licenseList[i].first_phase_amount);
    } 
    console.log("first_phase_amt-----",first_phase_amt)
    this.payamount=packDt.payment_phase == 1 ? packDt.final_package_price : first_phase_amt;
    this.applyLicenseService.checkLicenseApplied(this.nricInfo,this.passportInfo,packDt,this.GDL_License,this.PSV_License)
    .subscribe(res=>{
      this.spinner.hide();
      if(res['status'] == 'Success'){
        this.studInfo=res['data'][0];
        this.packDetails=packDt;
        this.packDetails['payamount']=this.payamount;
        this.getAutoReceiptNumber();
        this.modalService.open(showPay, { ariaLabelledBy: 'modal-basic-title' });
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }else{
        this.toastrService.error("Already Applied!!");
        this.router.navigate(['/clerk/apply/license'])
      }
    })
  }

  getAutoReceiptNumber(){
    this.applyLicenseService.getAutoReceiptNumber().subscribe(res=>{
      if(res['status'] == 'Success'){
        console.log("res-----rec====",res);
        if(this.payment_type.value == 'Cash'){
            this.reference_no.patchValue(res['receiptNo']);
            this.disableReference=true;
        }else{
            this.reference_no.patchValue('');
            this.disableReference=false;
        }
      }
    })
  }

  changePaymentType(){
    this.getAutoReceiptNumber();
  }

  setPaymentDetails(){
    console.log("studInfo=====",this.packDetails);
   this.spinner.show();
    var studNum=(this.nricInfo ? this.nricInfo.nric_number :this.passportInfo.passport_number)
    console.log("existing_license_front=======",this.nricInfo);
    var formData = new FormData();
    formData.append('baseRoot','root/Students/'+ ('stud-'+studNum));
    formData.append('packDt',JSON.stringify(this.packDetails));
    formData.append('expiry_date',this.expiry_date);
    formData.append('nricInfo',JSON.stringify(this.nricInfo));
    formData.append('passportInfo',JSON.stringify(this.passportInfo));
    formData.append('existingLicenseInfo',JSON.stringify(this.existingLicenseInfo));
    formData.append('existing_license_front',this.existing_license_front);
    formData.append('existing_license_rear',this.existing_license_rear);
    formData.append('studInfo',JSON.stringify(this.studInfo));
    formData.append('payment_type',this.payment_type.value);
    formData.append('reference_no',this.reference_no.value);
    formData.append('GDL_License',this.GDL_License);
    formData.append('PSV_License',this.PSV_License);
    // this.pay_senangpay(this.studInfo.name,this.studInfo.email_id,this.studInfo.mobile_number,this.payamount,'license_purchase',1,'') 
      this.applyLicenseService.setCustomerPackageDetails(formData)
      .subscribe((res)=>{
        this.spinner.hide();
        let payInfo={
          payment_amount  :this.payamount,
          payment_method:this.payment_type.value
        }
          if(res['status'] == 'Success'){
            let order_id=res['tranId'];
                this.modalService.dismissAll();
                this.toastrService.success("Applied Successfully!!");
                this.dialogRef = this.dialog.open(ReceiptDialogComponent);
                this.dialogRef.componentInstance.data = this.studInfo;
                this.dialogRef.componentInstance.licenseData = this.packDetails.licenseClasses;
                this.dialogRef.componentInstance.payInfo = payInfo;
                this.dialogRef.componentInstance.packDt = this.packDetails;
                this.dialogRef.componentInstance.enrollment_no = order_id;
          }else if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
      })
  }

  backToLicense(){
    this.router.navigate(['/clerk/apply/license'])
  }



// ----------------------------OLD WITH STRIPE PAYMENT---------------------

              // var handler = (<any>window).StripeCheckout.configure({
              //   key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
              //   locale: 'auto',
              //   token: (token: any) => {
              //     this.spinner.show();
              //     var studNum=(this.nricInfo ? this.nricInfo.nric_number :this.passportInfo.passport_number)
              //     console.log("existing_license_front=======",this.nricInfo)
              //     var formData = new FormData();
              //     // formData.append('licenseSelected',JSON.stringify(this.licenseSelected));
              //     formData.append('baseRoot','root/Students/'+ ('stud-'+studNum));
              //     formData.append('packDt',JSON.stringify(this.packDetails));
              //     formData.append('expiry_date',this.expiry_date);
              //     formData.append('nricInfo',JSON.stringify(this.nricInfo));
              //     formData.append('passportInfo',JSON.stringify(this.passportInfo));
              //     formData.append('existingLicenseInfo',JSON.stringify(this.existingLicenseInfo));
              //     formData.append('existing_license_front',this.existing_license_front);
              //     formData.append('existing_license_rear',this.existing_license_rear);
                    //  formData.append('studInfo',JSON.stringify(studInfo));
              //     this.applyLicenseService.setCustomerPackageDetails(formData)
              //     .subscribe((res)=>{
              //       this.spinner.hide();
              //         if(res['status'] == 'Success'){
              //           // localStorage.removeItem('licenseData');
              //           // localStorage.removeItem('licenseObj');
              //           // localStorage.removeItem('nric_number');
              //           // localStorage.removeItem('passport_number');
              //           // localStorage.removeItem('existing_license');
              //           this.toastrService.success("Applied Successfully!!")
              //           this.router.navigate(['/clerk/students/all-students'])
              //         }
              //     })
              //   }
              // })
              // handler.open({
              //   name: 'Demo Site',
              //   description: '2 widgets',
              //   amount: this.payamount * 100
              // });



// --------------------------------PAYMENT FROM UI------------------------------------------

 pay_senangpay(name,email,phone,amount,type,order_id,institution){

   let merchant_id = environment.merchantId;
   let secretkey = environment.secretKey;
   var url = environment.payUrl; 
   console.log("merchattttt=======",merchant_id,secretkey);
    var hash = crypto.HmacSHA256(secretkey.concat(type,amount,order_id), secretkey);
        console.log("url----",url);
    var ccForm = '<form action="' + url + '" id="customerData" method="post" name="customerData"><input name="detail" value="' + type + '" /><input name="amount" value="' + amount + '" /><input name="order_id" value="' + order_id + '" /><input name="name" value="' + name + '" /><input name="email" value="' + email + '" /><input name="phone" value="' + phone + '" /><input name="hash" value="' + hash + '" /></form>'
    document.getElementById('CCDataForm').innerHTML = ccForm;
    (document.getElementById('customerData') as HTMLFormElement).submit();
  }
 
}
