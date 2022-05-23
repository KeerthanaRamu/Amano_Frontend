import { Component, OnInit,ViewChild,ChangeDetectorRef, ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith,debounceTime,switchMap,of, BehaviorSubject } from 'rxjs';
import { LanguageService } from '../core/service/language.service';
import { ToastrService } from 'ngx-toastr';
import {TimelineService} from  './timeline.service'
import {Router,ActivatedRoute} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReceiptDialogComponent } from '../clerk/apply-license/receipt-dialog/receipt-dialog.component'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');

  nricNumberData:any;
  passportNumberData:any;
  tranNumberData:any;
  licenseTypeData:any;

  translateVal;
  statusDone;
  LicenseData= [];
  status_id: number;
  status: any;
  statusUpdateForm:FormGroup;
  statusDetail: any;
  showEnroll:boolean=false;
  showLicense:boolean=false;
  packInfo: any;
  studentInfo: any;
  licenseinfo: any;
  dialogRef: MatDialogRef<any>;
  instructorInfo: any;
  timeArray: any;
  package_name: any;
  statusDoneList: any[];

  constructor(private cdRef:ChangeDetectorRef,private fb: FormBuilder,
    private languageService:LanguageService,private toastrService: ToastrService,
    private timelineService:TimelineService,
    private router: Router,private route: ActivatedRoute,
    private modalService: NgbModal,public dialog: MatDialog,
    private spinner: NgxSpinnerService) {
      this.statusUpdateForm = this.fb.group({
        status: [''],
        result: [''],
        marks:[''],
        remarks: [''],
        rating:['']
      });
    }

  nric_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  passport_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  enrollment_no= new FormControl('', { validators: [autocompleteObjectValidator()] });
  license_type= new FormControl('', { validators: [autocompleteObjectValidator()] });


  nricNumberList: Observable<string[]>;
  passportNumberList: Observable<string[]>;
  tranNumberList: Observable<string[]>;
  licenseTypeList: Observable<string[]>;

  statusList:any;

    public validation_msgs = {
      'nric_number': [
        { type: 'invalidAutocompleteObject', message: 'NRIC Number not recognized. Click one of the options.' }
      ],
      'passport_number': [
        { type: 'invalidAutocompleteObject', message: 'Passport Number not recognized. Click one of the options.' }
      ],
      'enrollment_no': [
        { type: 'invalidAutocompleteObject', message: 'Transaction Number not recognized. Click one of the options.' }
      ],
      'license_type': [
        { type: 'invalidAutocompleteObject', message: 'License Class not recognized. Click one of the options.' }
      ]
    }

  ngOnInit(): void {

    this.getNRICNumber();
    this.getPassportNumber();
    this.languageService.languageChanged.subscribe(value => {
      this.translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');
    });
    this.getTimeDetails();

  }

  clearInput(evt: any,studentId,inputType): void {
    evt.stopPropagation();
    console.log("inputType====",inputType)
    studentId?.setValue('');
    if(inputType == 'nric_number' || inputType == 'passport_number'){
        this.enrollment_no.setValue('');
        this.license_type.setValue('');
        this.LicenseData=[];
        this.statusList=[];
    }else if(inputType == 'enrollment_no'){
        this.license_type.setValue('');
        this.LicenseData=[];
        this.statusList=[];
    }else if(inputType == 'license_type'){
        this.LicenseData=[];
        this.statusList=[];
    }
    this.licenceInput?.nativeElement.focus();
  }


  openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
   evt.stopPropagation();
    if(trigger.panelOpen)
      trigger.closePanel();
    else
      trigger.openPanel();
  }

  // -------------------------------------to get NRIC Number list------------------

  getNRICNumber(){
    this.timelineService.getAllNRICNumber()
      .subscribe(res=>{
        this.nricNumberData=res;
        this.nricNumberList = this.nric_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.nric_number)),
          map(name => (name ? this._filterNricNumber(name) : this.nricNumberData.slice())),
        );
      })
  }

  // -------------------------------------to get Passport Number list------------------

  getPassportNumber(){
    this.timelineService.getAllPassportNumber()
      .subscribe(res=>{
        this.passportNumberData=res;
        this.passportNumberList = this.passport_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.passport_number)),
          map(name => (name ? this._filterPassportNumber(name) : this.passportNumberData.slice())),
        );
      })
  }

// ---------------------------------------On change NRIC Number--------------------------

  selectedNricNumber(event){
    this.spinner.show();
    console.log("event.option.value.id===",event.option.value); 
    this.LicenseData=[];
    this.statusList=[]; 
    this.showLicense=false;
    if(event.option.value.id){
      this.studentInfo=event.option.value;   
      this.passport_number.setValue('');
      this.enrollment_no.setValue('');
      this.tranNumberData=[];
      this.timelineService.getEnrollmentNumberList(event.option.value.id)
      .subscribe((res)=>{
        this.spinner.hide();
          console.log("re----nric-----------",res);
          if(res['status'] == 'Success'){
            if(res['data'].length > 0){
              this.showEnroll=true;
              this.tranNumberData=res['data'];
              this.tranNumberList = this.enrollment_no.valueChanges.pipe(
                startWith(''),
                map(value => (typeof value === 'string' ? value : value.enrollment_no)),
                map(name => (name ? this._filterTranNumber(name) : this.tranNumberData.slice())),
              );
            }else{
              this.showEnroll=false;
              this.toastrService.warning("No Enrollment Number Available")
            }
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
          
      })
    }
  }

// ---------------------------------------On change Passport Number-----------------------

  selectedPassportNumber(event){
    this.spinner.show();
    console.log("event.option.value.id===",event.option.value.id);
    this.LicenseData=[];
    this.statusList=[];
    this.showLicense=false;
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.nric_number.setValue('');
      this.enrollment_no.setValue('');
      this.tranNumberData=[];
      this.timelineService.getEnrollmentNumberList(event.option.value.id)
      .subscribe((res)=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          if(res['data'].length > 0){
            this.showEnroll=true;
            this.tranNumberData=res['data'];
            this.tranNumberList = this.enrollment_no.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.enrollment_no)),
              map(name => (name ? this._filterTranNumber(name) : this.tranNumberData.slice())),
            );
          }else{
            this.showEnroll=false;
            this.toastrService.warning("No Enrollment Number Available")
          }
        }
        if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
      })
    }
  }

  // -------------------------------------------on Change enrollment no-----------------

  getLicenseListPerEnroll(event){
    console.log("----------",this.enrollment_no.value);
    this.spinner.show();
    this.showLicense=false;
    this.showEnroll=false;
    this.LicenseData=[];
    this.statusList=[];
    this.licenseTypeData=[];
    this.license_type.patchValue({});
    this.timelineService.getLicenseListPerEnroll(this.enrollment_no.value.student_id,event.option.value.id)
      .subscribe((res)=>{
        this.showLicense=true;
        this.spinner.hide();
        if(res['status'] == 'Success'){
          if(res['licenseData'].length > 0){
            this.showEnroll=true;
            this.licenseTypeData=res['licenseData'];
            this.licenseTypeList = this.license_type.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.enrollment_no)),
              map(name => (name ? this._filterLicenseClass(name) : this.licenseTypeData.slice())),
            );
            if(res['licenseData'].length == 1){
              this.license_type.patchValue(res['licenseData'][0]);
              this.loadTimeLine(res['licenseData'][0]);
            }
          }else{
            this.showEnroll=false;
            this.showLicense=false;
            this.toastrService.warning("No License Class Available")
          }
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
    })
  }

  // -------------------------------------On license class change----------------------
  
  checkTimelineForStudent(event){
    this.loadTimeLine(event.option.value)
  }

  // --------------------to load timeline--------------------
  loadTimeLine(enrollValue){
    this.spinner.show();
    console.log("====",enrollValue);
    this.LicenseData=[];
    this.statusList=[];
    this.statusDoneList=[];
    if(enrollValue){
      this.timelineService.getStatusListForTimeLine(enrollValue)
      .subscribe(res=>{
        this.statusList=res['statusData'];
        console.log("this.statusList=========",this.statusList)
        this.timelineService.checkTimelineForStudent(enrollValue)
        .subscribe((res)=>{
          this.spinner.hide();
          console.log("res--===-----",res);
          this.statusDone = res['timelineData'];
          this.licenseinfo=res['LicenseData'];
          this.package_name=this.licenseinfo[0]['package_'+this.translateVal];
          this.LicenseData=this.licenseinfo[0].license_class;
          for(let z=0;z<this.statusDone.length;z++){
            this.statusDoneList.push(this.statusDone[z].status_id)
          }
          if(enrollValue.license_process == 'PDL'){
            for(let i=0;i<this.statusList.length; i++){
              this.statusList[0]['BColor']='timeline-green';
              this.statusList[0]['completed_date']=this.nricNumberData ? this.nricNumberData[0].cur_date : this.passportNumberData[0].cur_date;
              for(let j=0;j<this.statusDone.length;j++){
                if(this.statusList[i].id == this.statusDone[j].status_id){
                  this.statusList[i].showStatus=true;
                  if(this.statusList[i].test_flag == 'R' && this.licenseinfo[0].result == 'Fail' && this.statusList[i].id == this.licenseinfo[0].status_id){
                    this.statusList[i]['BColor']='';
                  }else{
                    this.statusList[i]['BColor']='timeline-green';
                  }
                  this.statusList[i].marks=this.statusDone[j].marks;
                  this.statusList[i].rating=this.statusDone[j].rating;
                  // this.statusList[i]['scheduled_date']=this.statusDone[j].scheduled_date;
                  this.statusList[i]['completed_date']=this.statusDone[j].completed_date;
                  if(this.statusDone[j].payInfo.length > 0){
                    this.statusList[i].showReceipt=true;
                    this.statusList[i].payInfo=this.statusDone[j].payInfo[0]
                  }else{
                    this.statusList[i].showReceipt=false;
                  }
                }else{
                  if((this.statusList[i].id == 16 || this.statusList[i].id == 17 || this.statusList[i].id == 18) && !this.statusDoneList.includes(this.statusList[i].id)){
                    this.statusList[i].showStatus=false;
                  }else
                  if(this.statusList[i].test_flag == 'R' && !this.statusDoneList.includes(this.statusList[i].id)){
                    if(this.licenseinfo[0].result == 'Fail' && (Number(this.licenseinfo[0].status_id)+1 == this.statusList[i].id)){
                      this.statusList[i].showStatus=true;
                    }else{
                       this.statusList[i].showStatus=false;
                    }
                  }else{
                    this.statusList[i].showStatus=true;
                  }
                }
              }
            }
          }else{
            for(let i=0;i<this.statusList.length; i++){
              for(let j=0;j<this.statusDone.length;j++){
                if(this.statusList[i].id == this.statusDone[j].status_id){
                  this.statusList[i].showStatus=true;
                  if(this.statusList[i].test_flag == 'R' && this.licenseinfo[0].result == 'Fail' && this.statusList[i].id == this.licenseinfo[0].status_id){
                    this.statusList[i]['BColor']='';
                  }else{
                    this.statusList[i]['BColor']='timeline-green';
                  }
                 // this.statusList[i]['BColor']='timeline-green';//888888888
                  this.statusList[i].marks=this.statusDone[j].marks;
                  this.statusList[i].rating=this.statusDone[j].rating;
                  // this.statusList[i]['scheduled_date']=this.statusDone[j].scheduled_date;
                  this.statusList[i]['completed_date']=this.statusDone[j].completed_date;
                  if(this.statusDone[j].payInfo.length > 0){
                    this.statusList[i].showReceipt=true;
                  }else{
                    this.statusList[i].showReceipt=false;
                  }
                }else{
                  if((this.statusList[i].id == 16 || this.statusList[i].id == 17 || this.statusList[i].id == 18) && !this.statusDoneList.includes(this.statusList[i].id)){
                    this.statusList[i].showStatus=false;
                  }else
                  if(this.statusList[i].test_flag == 'R' && !this.statusDoneList.includes(this.statusList[i].id)){
                    if(this.licenseinfo[0].result == 'Fail' && (Number(this.licenseinfo[0].status_id)+1 == this.statusList[i].id)){
                      this.statusList[i].showStatus=true;
                    }else{
                       this.statusList[i].showStatus=false;
                    }
                  }else{
                    this.statusList[i].showStatus=true;
                  }
                }
              }
            }
          }
          console.log("this.statusList====",this.statusList)
        })
      })
    }
  }

  // --------------show student details-----------------
  showStudent(viewStudent){
    this.LicenseData=[];
    this.timelineService.getStudPackageInfo(this.license_type.value)
    .subscribe((res)=>{
      this.packInfo=res['data'][0];
      this.packInfo.package_name=this.packInfo['package_'+this.translateVal];
      this.packInfo.package_description=this.packInfo['package_desc_'+this.translateVal];
      this.LicenseData=this.packInfo['license_class']
      this.modalService.open(viewStudent, { ariaLabelledBy: 'modal-basic-title' });
    })
  }

  viewInstructorDetails(id: number,instructorData) {
    this.timelineService.viewInstructorDetails(this.license_type.value,id)
    .subscribe(res=>{
      if(res['insData'].length > 0){    
        this.instructorInfo=res['insData'];
        for(let i=0;i<this.instructorInfo.length;i++){
          for(let j=0;j<this.timeArray.length;j++){
            let timeSlotDt=this.zeroPad(this.instructorInfo[i].TimeSlot,this.timeArray.length);
              if(timeSlotDt[j] == 1){
                this.instructorInfo[i].schedule_time=this.timeArray[j].range;
                break;
              }
            }
        }
        console.log("this.instructorInfo==========",this.instructorInfo)
        this.modalService.open(instructorData, { ariaLabelledBy: 'modal-basic-title',size:'lg' });
      }else{
        this.toastrService.warning  ("No Details Available!!")
      }
    })
  }

  showPaymentReceipt(statusdt){
    console.log("statusdt----",statusdt);
      this.dialogRef = this.dialog.open(ReceiptDialogComponent);
      this.dialogRef.componentInstance.data = this.nric_number.value;
      this.dialogRef.componentInstance.licenseData = this.LicenseData;
      this.dialogRef.componentInstance.payInfo = statusdt.payInfo;
      this.dialogRef.componentInstance.packDt = this.licenseinfo[0];
      this.dialogRef.componentInstance.enrollment_no = this.enrollment_no.value.enrollment_no;
  }

  editPackageDetails(){
    this.toastrService.info("To Change the Package, Please contact clerk!!")
    // this.timelineService.setPackageInfoToEdit(this.licenseinfo);
    // this.router.navigate(['/clerk/apply/update-package']);
  }

  updateStatus(id: number,deleteRecord) {
    console.log("======",this.license_type.value);
    if(this.license_type.value.license_process == 'PDL'){
        this.timelineService.getStatusListForStudent(this.license_type.value)
        .subscribe(res => {
          let expiryData=res['expiryData'];
          console.log("getStatusListForStudent===",id,expiryData,res['data'])
          if(res['data'].length>0){
            if (id == res['data'][0].id) {
              if(res['data'][0].id == 7){
                if(expiryData[0].LDL_license_no != null){
                  this.status_id=res['data'][0].id;
                  this.statusDetail=res['data'][0];
                  this.statusUpdateForm.patchValue({
                    'status':res['data'][0].status
                  })
                  this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
                }else{
                  this.toastrService.warning("LDL License is in Process..")
                }
              }else if(res['data'][0].id == 15){
                if(expiryData[0].PDL_license_no != null){
                  this.status_id=res['data'][0].id;
                  this.statusDetail=res['data'][0];
                  this.statusUpdateForm.patchValue({
                    'status':res['data'][0].status
                  })
                  this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
                }else{
                  this.toastrService.warning("PDL License is in Process..")
                }
              }else if(res['data'][0].id == 26){
                if(expiryData[0].GDL_license_no != null){
                  this.status_id=res['data'][0].id;
                  this.statusDetail=res['data'][0];
                  this.statusUpdateForm.patchValue({
                    'status':res['data'][0].status
                  })
                  this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
                }else{
                  this.toastrService.warning("GDL License is in Process..")
                }
              }else if(res['data'][0].id == 34){
                if(expiryData[0].PSV_license_no != null){
                  this.status_id=res['data'][0].id;
                  this.statusDetail=res['data'][0];
                  this.statusUpdateForm.patchValue({
                    'status':res['data'][0].status
                  })
                  this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
                }else{
                  this.toastrService.warning("PSV License is in Process..")
                }
              }else{
                this.status_id=res['data'][0].id;
                this.statusDetail=res['data'][0];
                this.statusUpdateForm.patchValue({
                  'status':res['data'][0].status
                })
                this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
              }
            }else{
              this.toastrService.warning("Not Applicable!!")
            }
          }else{
            this.toastrService.warning("Not Applicable!!")
          }
        })
      }else{
        this.timelineService.getStatusListForStudentOfGDL(this.license_type.value)
        .subscribe(res => {
          let expiryData=res['expiryData'];
          console.log("getStatusListForStudent===",id,expiryData,res['data'])
          if(res['data'].length>0){
            if (id == res['data'][0].id) {
              if(res['data'][0].id == 7){
                if(expiryData[0].LDL_license_no != null){
                  this.status_id=res['data'][0].id;
                  this.statusDetail=res['data'][0];
                  this.statusUpdateForm.patchValue({
                    'status':res['data'][0].status
                  })
                  this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
                }else{
                  this.toastrService.warning("LDL License is in Process..")
                }
              }else if(res['data'][0].id == 15){
                if(expiryData[0].PDL_license_no != null){
                  this.status_id=res['data'][0].id;
                  this.statusDetail=res['data'][0];
                  this.statusUpdateForm.patchValue({
                    'status':res['data'][0].status
                  })
                  this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
                }else{
                  this.toastrService.warning("PDL License is in Process..")
                }
              }else{
                this.status_id=res['data'][0].id;
                this.statusDetail=res['data'][0];
                this.statusUpdateForm.patchValue({
                  'status':res['data'][0].status
                })
                this.modalService.open(deleteRecord, { ariaLabelledBy: 'modal-basic-title' });
              }
            }else{
              this.toastrService.warning("Not Applicable!!")
            }
          }else{
            this.toastrService.warning("Not Applicable!!")
          }
        })
      }
    
  }

  updateStudentStatusInfo() {
    let statusdt={
      status_id:this.status_id,
      remarks:this.statusUpdateForm.value.remarks,
      marks:this.statusUpdateForm.value.marks,
      result:this.statusUpdateForm.value.result,
      rating:this.statusUpdateForm.value.rating
    }
    this.timelineService.updateStudentStatusInfo(this.license_type.value,statusdt)
      .subscribe(res => {
        this.toastrService.success("Updated Successfully!!!");
      })
  }


  displayFnNRICNUmber(user): string {
    return user && user.nric_number ? user.nric_number : '';
  }

  displayFnPassportNumber(user): string {
    return user && user.passport_number ? user.passport_number : '';
  }

  displayFnTransactionNumber(user): string {
    console.log("user===",user)
    return user && user.enrollment_no ? user.enrollment_no : '';
  }

  displayFnLicenseClass(user): string {
    console.log("user===",user)
    return user && user.license_class ? user.license_class : '';
  }
  
  
  private _filterNricNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.nricNumberData.filter(option => option.nric_number.toLowerCase().includes(filterValue));
  }

  private _filterPassportNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.passportNumberData.filter(option => option.passport_number.toLowerCase().includes(filterValue));
  }

  private _filterTranNumber(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.tranNumberData.filter(option => option.enrollment_no.toLowerCase().includes(filterValue));
  }

  private _filterLicenseClass(name: string): [] {
    const filterValue = name.toLowerCase();
    return this.licenseTypeData.filter(option => option.license_type.toLowerCase().includes(filterValue));
  }

  getTimeDetails(){
    this.timelineService.getTimeDetails()
    .subscribe((res)=>{
        let resObj=res['data'][0];
        this.makeTimeIntervals((resObj.working_hour_from).substr(0, 5),(resObj.working_hour_to).substr(0, 5),60,(resObj.rest_hour_from).substr(0, 5),(resObj.rest_hour_to).substr(0, 5))
    })
  }

  makeTimeIntervals (startTime, endTime, increment, restStart, restEnd){
    startTime = startTime.toString().split(':');
    endTime = endTime.toString().split(':');
    increment = parseInt(increment, 10);

    var pad = function (n) { return (n < 10) ? '0' + n.toString() : n; },
        startHr = parseInt(startTime[0], 10),
        startMin = parseInt(startTime[1], 10),
        endHr = parseInt(endTime[0], 10),
        endMin = parseInt(endTime[1], 10),
        currentHr = startHr,
        currentMin = startMin,
        previous = currentHr + ':' + pad(currentMin),
        current = '',
        r = [];

      do {
          currentMin += increment;
          if ((currentMin % 60) === 0 || currentMin > 60) {
              currentMin = (currentMin === 60) ? 0 : currentMin - 60;
              currentHr += 1;
          }
          current = currentHr + ':' + pad(currentMin);
          r.push({'range':previous + ' - ' + current,'checkValue':0,employeeList:[]});
          previous = current;
    } while (currentHr !== endHr);
        var restTime=restStart+' - '+ restEnd;
        this.timeArray=r.filter((el)=>{return el.range != restTime});
    };

    zeroPad(num,total) {
      return num.toString().padStart(Number(total), "0");
    }

}
