import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { Observable,map, startWith,debounceTime,switchMap,of, BehaviorSubject } from 'rxjs';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { EventInput } from '@fullcalendar/angular';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { StudentScheduleService } from '../students-schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { Calendar } from '../students-schedule.model';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ReceiptDialogComponent} from '../../apply-license/receipt-dialog/receipt-dialog.component'
import { DeviceDetectorService } from 'ngx-device-detector';
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
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');

  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;

  scheduleList:any;
  handler: any;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData:any=[];
  filterItems:any =[]
  LicenseData:any=[];
  translateVal=(localStorage.lang == 'ml' ? 'malay' : 'english');

  
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  dialogRef: MatDialogRef<any>;
  payment_type=new FormControl('Cash');
  reference_no=new FormControl('');

  nricNumberData:any;
  passportNumberData:any;
  tranNumberData:any;
  licenseTypeData:any;


  nric_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  passport_number= new FormControl('', { validators: [autocompleteObjectValidator()] });
  enrollment_no= new FormControl('', { validators: [autocompleteObjectValidator()] });
  license_type= new FormControl('', { validators: [autocompleteObjectValidator()] });

  nricNumberList: Observable<string[]>;
  passportNumberList: Observable<string[]>;
  tranNumberList: Observable<string[]>;
  licenseTypeList: Observable<string[]>;

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

  clearInput(evt: any,studentId,inputType): void {
    evt.stopPropagation();
    console.log("inputType====",inputType)
    studentId?.setValue('');
    if(inputType == 'nric_number' || inputType == 'passport_number'){
        this.enrollment_no.setValue('');
        this.license_type.setValue('');
        this.currentStatus='';
        this.LicenseData=[];
        this.calendarData=[];
        this.waitingLicense='';
    }else if(inputType == 'enrollment_no'){
        this.license_type.setValue('');
        this.currentStatus='';
        this.LicenseData=[];
        this.calendarData=[];
        this.waitingLicense='';
    }else if(inputType == 'license_type'){
        this.LicenseData=[];
        this.currentStatus='';
        this.calendarData=[];
        this.waitingLicense='';
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

  enrollDetails: any;
  scheduleStatus: string;
  amountToBePaid: any;
  upcomingStatus: any;
  timeArray: any[];
  studentInfo: any;
  licenseinfo: any;
  waitingLicense: string;
  disableReference: boolean=true;
  currentStatus: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: StudentScheduleService,
    private snackBar: MatSnackBar,private spinner:NgxSpinnerService,
    private router:Router,private toastrService: ToastrService,private modalService: NgbModal,
    private deviceService: DeviceDetectorService
  ) {
    super();
    this.dialogTitle = 'Add New Event';
    this.calendar = new Calendar({});
    this.addCusForm = this.createCalendarForm(this.calendar);
    this.getScheduleList();

  }

  public ngOnInit(): void {
    
    this.getNRICNumberForStudentSchedule();
    this.getPassportNumberForStudentSchedule();
    this.getTimeDetails();
    
  }

// -------------------------------------to get NRIC Number list------------------

  getNRICNumberForStudentSchedule(){
    this.calendarService.getNRICNumberForStudentSchedule()
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

  getPassportNumberForStudentSchedule(){
    this.calendarService.getPassportNumberForStudentSchedule()
      .subscribe(res=>{
        this.passportNumberData=res;
        this.passportNumberList = this.passport_number.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.passport_number)),
          map(name => (name ? this._filterPassportNumber(name) : this.passportNumberData.slice())),
        );
      })
  }

  // ---------------------------------to get schedule list------------------------

  getScheduleList(){
    this.calendarService.getScheduleList()
    .subscribe(res=>{
        this.scheduleList=res['data'];
        for(let i=0;i<this.scheduleList.length;i++){
          this.scheduleList[i].checked=true;
          this.filterItems.push(this.scheduleList[i].status)
        }
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

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: (this.deviceService.isDesktop() ? 'dayGridMonth' : 'listWeek'),
    displayEventTime:false,
    weekends: true,
    editable: true,
    // selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };


  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row) {
    console.log("this.enrollDetails-----------",this.enrollDetails)
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      lead_time: row.event._def.extendedProps.lead_time,
      statusid:row.event._def.extendedProps.statusid,
      schedule_name: row.event._def.extendedProps.schedule_name,
      schedule_view:row.event._def.extendedProps.schedule_view,
      schedule_view_assignment:row.event._def.extendedProps.employeeName,
      startDate: row.event.start,
      endDate: row.event.end,
      enrollData:this.enrollDetails
    };

    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    this.getTimeDetails();
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        timeData:this.timeArray,
        action: 'edit',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        // this.getScheduleDetails();
        this.addCusForm.reset();
      } else if (result === 'delete') {
        // this.getScheduleDetails();
      }
    });
  }

  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = '';
    singleEvent.groupId = calendarData.category;
    singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array

    this.calendarOptions.events = calendarEvents;
  }

  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      lead_time: [
        calendar.lead_time,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      schedule_name: [calendar.schedule_name],
      schedule_view: [calendar.schedule_view],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
    });
  }


// ---------------------------------------On change NRIC Number--------------------------
  selectedNricNumber(event){
    this.spinner.show();
    this.studentInfo='';
    this.enrollDetails=[]; 
    this.tranNumberData=[];
    this.enrollment_no.setValue('');
    this.license_type.setValue('')
    this.scheduleStatus='';
    this.LicenseData=[];
    this.calendarData=[];
    this.currentStatus='';
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.passport_number.setValue('');
      this.calendarService.getEnrollmentNumberForSchedule(event.option.value.id)
      .subscribe((res)=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          if(res['enrollData'].length > 0){
            this.tranNumberData=res['enrollData'];
            this.tranNumberList = this.enrollment_no.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.enrollment_no)),
              map(name => (name ? this._filterTranNumber(name) : this.tranNumberData.slice())),
            );
          }else{
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
    this.studentInfo='';
    this.spinner.show();
    this.enrollDetails=[]; 
    this.tranNumberData=[];
    this.enrollment_no.setValue('');
    this.license_type.setValue('')
    this.scheduleStatus='';
    this.LicenseData=[];
    this.calendarData=[];
    this.currentStatus='';
    if(event.option.value.id){
      this.studentInfo=event.option.value;
      this.nric_number.setValue('');
      this.calendarService.getEnrollmentNumberForSchedule(event.option.value.id)
      .subscribe((res)=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          if(res['enrollData'].length > 0){
            this.tranNumberData=res['enrollData'];
            this.tranNumberList = this.enrollment_no.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.enrollment_no)),
              map(name => (name ? this._filterTranNumber(name) : this.tranNumberData.slice())),
            );
          }else{
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
    this.enrollDetails=[]; 
    this.scheduleStatus='';
    this.LicenseData=[];
    this.calendarData=[];
    this.licenseTypeData=[];
    this.currentStatus='';
    this.license_type.setValue('')
    this.calendarService.getLicenseListPerEnroll(this.enrollment_no.value.student_id,event.option.value.id)
      .subscribe((res)=>{
        this.spinner.hide();
        if(res['status'] == 'Success'){
          if(res['licenseData'].length > 0){
            this.licenseTypeData=res['licenseData'];
            this.licenseTypeList = this.license_type.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.enrollment_no)),
              map(name => (name ? this._filterLicenseClass(name) : this.licenseTypeData.slice())),
            );
            if(res['licenseData'].length == 1){
              this.license_type.patchValue(res['licenseData'][0]);
              this.checkPaymentInfo();
            }
          }else{
            this.toastrService.warning("No License Class Available")
          }
      }
      if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!")
        this.router.navigate(['/authentication/signin']);
      }
    })
  }

  // --------------- On change license class -- check payment done-------------------------

  checkPaymentInfo(){
    this.LicenseData=[];
    this.calendarData=[];
    this.waitingLicense='';
    this.currentStatus=this.license_type.value.status;
    if(this.license_type.value.status_id == 2){
      this.toastrService.warning("Please make Initial Payment!!")
    }else{
      console.log("license_type.value---===========getStudentSchedule==========--",this.license_type.value);
      if(this.license_type.value.license_process == 'PDL'){
          this.calendarService.checkPaymentDone(this.license_type.value)
          .subscribe((res)=>{
            console.log("res----------",res);
                this.licenseinfo=res['LicenseData'];
                this.amountToBePaid=res['amountToBePaid'];
                this.upcomingStatus=res['nextStatus'][0];
                console.log("licenseinfo-------------",this.licenseinfo);
                for(let i=0;i<this.licenseinfo.length;i++){
                  this.licenseinfo[i].package_name=this.licenseinfo[i]['package_'+this.translateVal];
                  this.licenseinfo[i].package_description=this.licenseinfo[i]['package_desc_'+this.translateVal];
                  this.LicenseData.push(this.licenseinfo[i].license_class)
                }
                if(res['status'] == 'Success'){
                  if(this.upcomingStatus.id == 7 || this.upcomingStatus.id == 15){
                      this.scheduleStatus="Waiting";
                      this.waitingLicense=(this.upcomingStatus.id == 7 ? 'LDL' : 'PDL')
                  }else{
                    this.scheduleStatus='Success';
                    this.showSchedule(this.license_type.value)
                  }
                }else if(res['status'] == 'Pay'){
                    this.scheduleStatus='Pay';
                }else if(res['status'] == "Pay Not Found"){
                  this.toastrService.warning("Retest Amount is not defined!!!")
                }else if(res['status'] == 'Completed'){
                  this.toastrService.success("Process Completed!!!")
                }else if(res['status'] == 'Session Expired'){
                  this.toastrService.error("Session Expired!!!")
                  this.router.navigate(['/authentication/signin']);
                }
          })
      }else{
          this.calendarService.checkPaymentDoneForGDLProcess(this.license_type.value)
            .subscribe((res)=>{
              console.log("res----------",res);
                  this.licenseinfo=res['LicenseData'];
                  this.amountToBePaid=res['amountToBePaid'];
                  this.upcomingStatus=res['nextStatus'][0];
                  console.log("licenseinfo-------------",this.licenseinfo);
                  for(let i=0;i<this.licenseinfo.length;i++){
                    this.licenseinfo[i].package_name=this.licenseinfo[i]['package_'+this.translateVal];
                    this.licenseinfo[i].package_description=this.licenseinfo[i]['package_desc_'+this.translateVal];
                    this.LicenseData.push(this.licenseinfo[i].license_class)
                  }
                  if(res['status'] == 'Success'){
                    if(this.upcomingStatus.id == 26 || this.upcomingStatus.id == 34){
                        this.scheduleStatus="Waiting";
                        this.waitingLicense=this.license_type.value.license_process;
                    }else{
                      this.scheduleStatus='Success';
                      this.showSchedule(this.license_type.value)
                    }
                  }else if(res['status'] == 'Pay'){
                      this.scheduleStatus='Pay';
                  }else if(res['status'] == "Pay Not Found"){
                    this.toastrService.warning("Retest Amount is not defined!!!")
                  }else if(res['status'] == 'Completed'){
                      this.toastrService.success("Process Completed!!!")
                  }else if(res['status'] == 'Session Expired'){
                    this.toastrService.error("Session Expired!!!")
                    this.router.navigate(['/authentication/signin']);
                  }
            })
      }
    }
     
  }

  // ------------ after checking payment status, show schedule info--------------------

  showSchedule(enrollValue){
    this.spinner.show();
    this.calendarData=[];
    this.calendarService.getStudentSchedulePerEnroll(enrollValue,this.upcomingStatus.id)
      .subscribe((res)=>{
        this.spinner.hide();
        console.log("res============",res)
        if(res['status'] == 'Success'){
          this.enrollDetails=this.license_type.value;
          for(let i=0;i<res['scheduleList'].length;i++){
            this.calendarData.push({
              title: res['scheduleList'][i].status,
              start: new Date(res['scheduleList'][i].startDate),
              end: new Date(res['scheduleList'][i].endDate),  
              className: res['scheduleList'][i].schedule_color,
              id: res['scheduleList'][i].id,
              statusid:res['scheduleList'][i].status_id,
              schedule_name: res['scheduleList'][i].status,
              schedule_view:res['scheduleList'][i].schedule_view,
              assignment:res['scheduleList'][i].AssignmentList,
              startDate: new Date(res['scheduleList'][i].startDate),
              endDate: new Date(res['scheduleList'][i].endDate),
              employeeName:res['scheduleList'][i].employee_name
            })
          }
          this.calendarEvents=this.calendarData;
          this.tempEvents = this.calendarEvents;
          this.calendarOptions.events = this.calendarEvents;
        }
        if(res['status'] == 'Session Expired'){
          this.toastrService.error("Session Expired!!!")
          this.router.navigate(['/authentication/signin']);
        }
      })
  }

  showStudent(viewStudent){
    this.modalService.open(viewStudent, { ariaLabelledBy: 'modal-basic-title' });
  }

  getAutoReceiptNumber(){
    this.calendarService.getAutoReceiptNumber().subscribe(res=>{
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

  showPayment(showPay){
    this.getAutoReceiptNumber();
    this.modalService.open(showPay, { ariaLabelledBy: 'modal-basic-title' });
  }


  setPaymentDetails(){
  console.log("enrollment_no====",this.enrollment_no.value,this.license_type.value);
    this.calendarService.setPaymentDetails(this.license_type.value,this.amountToBePaid,this.payment_type.value,this.reference_no.value)
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        this.modalService.dismissAll();
        this.toastrService.success("Payment Done!!");
        this.scheduleStatus='Success';
        let payData={
          payment_amount:this.amountToBePaid,
          payment_method:this.payment_type.value
        }
        this.showSchedule(this.license_type.value)
        this.dialogRef = this.dialog.open(ReceiptDialogComponent);
        this.dialogRef.componentInstance.data = this.studentInfo;
        this.dialogRef.componentInstance.licenseData = this.LicenseData;
        this.dialogRef.componentInstance.payInfo = payData;
        this.dialogRef.componentInstance.packDt = this.licenseinfo[0];
        this.dialogRef.componentInstance.enrollment_no = this.enrollment_no.value.enrollment_no;
      }else if(res['status'] == 'Session Expired'){
        this.toastrService.error("Session Expired!!!");
        this.router.navigate(['/authentication/signin']);
      }else{
        this.scheduleStatus='Pay';
        this.toastrService.success("Payment Failed, Please try again!!");
      }
    
    })
}


// -------------------------------------get time details-------------------

getTimeDetails(){
  this.calendarService.getTimeDetails()
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

}
