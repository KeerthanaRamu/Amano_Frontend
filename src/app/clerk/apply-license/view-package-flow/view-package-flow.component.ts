import { Component, OnInit } from '@angular/core';
import { ApplyLicenseService } from '../apply-license.service';
import { LanguageService } from 'src/app/core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-package-flow-pacakge',
  templateUrl: './view-package-flow.component.html',
  styleUrls: ['./view-package-flow.component.css']
})
export class ViewPackageFlowComponent implements OnInit {



  apiURL=environment.apiUrl;
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
  licenseFlowImage: any;
  currentIndex: any = -1;
  showFlag: any = false;
  packData: any;
  selectedImageIndex: number = -1;
  imageObject:any=[];

  constructor(private applyLicenseService:ApplyLicenseService,private toastrService:ToastrService,
    private spinner:NgxSpinnerService,public dialog: MatDialog,
    private  languageService:LanguageService,private router:Router,
    private modalService: NgbModal) {
    this.spinner.show();
    this.packData=this.applyLicenseService.getPackageInfoForFlowImage();
    if(this.packData){
      this.getLicenseFlowImage(this.packData);
    }else{
      this.spinner.hide();
      this.router.navigate(['/clerk/apply/license']);

    }
   }

  ngOnInit(): void {
   
     
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
    })
    
  }


  getLicenseFlowImage(packDt){
   this.applyLicenseService.getLicenseFlowImage(packDt)
   .subscribe((res)=>{
    this.spinner.hide();
     let resObj=res;
     for(let i=0;i<resObj.length;i++){
      resObj[i].license_desc=resObj[i]['license_desc_'+this.translateVal];
      this.imageObject.push({
        'image': this.apiURL +'/'+ resObj[i].license_flow,
        'title': resObj[i].license_class
      })
     }
      this.licenseFlowImage=resObj;
      this.imageObject.push({
        'image': '../../../../assets/images/dress-code-male.png',
        'title':'Dress Code Male'
        },{
          'image': '../../../../assets/images/dress-code-female.png',
          'title':'Dress Code Female'
        })
      console.log("this.imageObject----",this.imageObject)
   })
  }

  backToPackage(){
    if(this.packData['packageStage'] == 'Apply'){
      this.router.navigate(['/clerk/apply/package']);
    }else if(this.packData['packageStage'] == 'Update'){
      this.router.navigate(['/clerk/apply/update-package'])
    }
    
  }

  showLightbox(index) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
      this.showFlag = false;
      this.currentIndex = -1;
  }

}
