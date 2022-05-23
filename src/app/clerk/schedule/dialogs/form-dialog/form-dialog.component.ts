import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';
import { Component, Inject , ViewChild, ElementRef, OnInit } from '@angular/core';
import { ScheduleService } from '../../schedule.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormBuilder, FormGroup, Validators,FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable,map, startWith } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Calendar } from '../../schedule.model';
import { ToastrService } from 'ngx-toastr';
import {MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})


export class FormDialogComponent implements OnInit {

  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  @ViewChild('licenceInput') licenceInput: ElementRef<HTMLInputElement>;

  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  showDeleteBtn:boolean = false;
  ViewAssignList:any;
  scheduleList:any;
  editInfo:any;
  timeSlotList:any;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  viewAssign_selected:any= [];

  viewAssignTypeData:any;
  licenseClassData:any;

  license_type = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 
  schedule_view_assignment = new FormControl('', { validators: [autocompleteObjectValidator(), Validators.required] }); 

  viewAssignTypeList: Observable<string[]>;
  licenseClassList: Observable<string[]>;
  actionData: any;
  timeArray: any[];


  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: ScheduleService,private modalService: NgbModal,
    private fb: FormBuilder,private toastrService: ToastrService,private spinner: NgxSpinnerService,
    private router:Router
  ) {
    this.action = data.action;  
    this.actionData=data;  
    this.timeArray=data.timeData;
    this.getScheduleList();
    this.getLicenseList();
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      this.spinner.show();
      this.timeSlotList=[];
      this.viewAssignTypeData=[];
      this.dialogTitle = this.actionData.calendar.title;
      this.calendar = this.actionData.calendar;
      this.showDeleteBtn = true;
      // --------------------get schedule edit info-----------------------
        this.calendarService.getScheduleEditView(this.actionData.calendar)
        .subscribe(res=>{
          if(res['status'] == 'Success'){
          this.editInfo=res['data'];
          let commonTimeslot=[];
            if(this.editInfo.length > 0){
              for(let i=0;i<this.editInfo.length;i++){
                this.license_type.patchValue(
                  {id : this.editInfo[i].license_id,
                    license_class:this.editInfo[i].license_class
                   })
                if(this.editInfo[i].TimeSlot.length<this.timeArray.length){
                  this.editInfo[i].TimeSlot=this.zeroPad(this.editInfo[i].TimeSlot,this.timeArray.length);
                  commonTimeslot.push(this.editInfo[i].TimeSlot);
                  this.timeSlotList.push(this.editInfo[i].TimeSlot);
                }else{
                  commonTimeslot.push(this.editInfo[i].TimeSlot);
                  this.timeSlotList.push(this.editInfo[i].TimeSlot);
                }
                this.viewAssignTypeData.push({
                  id:this.editInfo[i].employee_id,
                  name:this.editInfo[i].employee_name,
                  checked:true
                });
                this.spinner.hide();
              }
            }

            var result = commonTimeslot.reduce(function(a, b) {
              return a || b;
            });

            for(let j=0;j<this.timeArray.length;j++){
              if(result[j] == 1){
                this.timeArray[j].checkValue=1;
                this.timeArray[j].checked=true;
              }else{
                this.timeArray[j].checkValue=0;
                this.timeArray[j].checked=false;
              }
            }

            this.viewAssign_selected=this.viewAssignTypeData;
            this.viewAssignTypeList = this.schedule_view_assignment.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.name)),
              map(name => (name ? this._filterviewAssignType(name) : this.viewAssignTypeData.slice())),
            );
          }
          if(res['status'] == 'Session Expired'){
            this.toastrService.error("Session Expired!!!")
            this.router.navigate(['/authentication/signin']);
          }
        });
       
      this.calendarForm = this.editContactForm();
    } else {
      for(let j=0;j<this.timeArray.length;j++){
          this.timeArray[j].checkValue=1;
          this.timeArray[j].checked=true;//now
      }
      this.dialogTitle = 'New Event';
      this.calendar = new Calendar({});
      this.showDeleteBtn = false;
      this.calendarForm = this.createContactForm(this.actionData.calendar);
    }
  }

  // ---------------------get license list-----------------
  getLicenseList(){
    this.calendarService.getLicenseClassList()
    .subscribe(res=>{
      this.licenseClassData=res['data'];
      this.licenseClassList = this.license_type.valueChanges.pipe(
        startWith(''),
        map((fruit: string | null) => fruit ? this._filterLicenseType(fruit) : this.licenseClassData.slice()));
    })
  }


  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  displayFnLicense(user): string {
    return user && user.license_class ? user.license_class : '';
  }

  private _filterLicenseType(name): [] {
    const filterValue = name.toLowerCase();
    return this.licenseClassData.filter(option => option.license_class.toLowerCase().includes(filterValue));
  }

  public validation_msgs = {
    'license_type': [
      { type: 'invalidAutocompleteObject', message: 'License Class not recognized. Click one of the options.' }
    ],
  }

  // ---------------on change schedule view----------------------

  showScheduleView(){
    this.viewAssign_selected=[];
    this.viewAssignTypeData=[];
    this.license_type.patchValue('')
    // if(this.calendarForm.value.schedule_view != 'All'){
    //   for(let k=0;k<this.timeArray.length;k++){
    //     this.timeArray[k].checked=false;
    //     this.timeArray[k].checkValue=0;
    //   }
    // }else{
    //   this.viewAssignTypeData=[];
    //   for(let k=0;k<this.timeArray.length;k++){
    //     this.timeArray[k].checked=true;
    //     this.timeArray[k].checkValue=1;
    //   }
    // }
  }
  
// ---------------------------------On change license type------------------------------
  selectedLicenseType(event){
    this.viewAssign_selected=[];
    this.viewAssignTypeData=[];
    if(this.calendarForm.value.schedule_view != 'All'){
        this.calendarService.getScheduleViewAssignList(this.calendarForm.value.schedule_view,this.license_type.value)
        .subscribe(res=>{
            this.viewAssignTypeData=res['data'];
            this.viewAssignTypeList = this.schedule_view_assignment.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.name)),
              map(name => (name ? this._filterviewAssignType(name) : this.viewAssignTypeData.slice())),
            );
        })
    }
  }

  // ---------------------------------To set binary data to timearry----------
  zeroPad(num,total) {
    return num.toString().padStart(Number(total), "0");
  }

  createContactForm(calendarFm): FormGroup {
    return this.fb.group({
      id: [this.calendar.id],
      schedule_name: [this.calendar.schedule_name],
      schedule_view: [this.calendar.schedule_view],
      startDate: [calendarFm.start,
      [Validators.required]
      ],
      endDate: [calendarFm.start,
      [Validators.required]
      ]
    });
  }

  editContactForm(): FormGroup {
    return this.fb.group({
      id: [this.calendar.id],
      schedule_name: [this.calendar.schedule_name],
      schedule_view: [this.calendar.schedule_view],
      startDate: [this.calendar.startDate,
      [Validators.required]
      ],
      endDate: [this.calendar.endDate,
      [Validators.required]
      ]
    });
  }
  
  // ----------------------to delete schedule--------------------

  deleteEvent() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete the Schedule?',
        btnColor:"warn",
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    })
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
         this.calendarService.deleteScheduleDetails(this.editInfo)
          .subscribe(res=>{
            this.toastrService.success("Deleted Successfully!!!!")
            this.dialogRef.close('delete');
          })
      }
    });
   
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // -----------------------to set schedule details------------------------------------

 setScheduleDetails() {
   if(this.action == 'add'){
      let timeSlot='';
      let count=0;
    for(let j=0;j<this.timeArray.length;j++){
      timeSlot=timeSlot+this.timeArray[j].checkValue;
      if(this.timeArray[j].checkValue == 1){
        count++;
      }
    }
    if(count > 0){
        if(this.calendarForm.value.schedule_view == 'All'){
            this.calendarService.setScheduleDetails(this.calendarForm.value,timeSlot,this.viewAssign_selected,this.license_type.value)
            .subscribe(res=>{
              if(res['status'] == 'Success'){
                this.toastrService.success("Updated Successfully!!!!");
                this.dialogRef.close('submit');
              }else if(res['status'] == 'Session Expired'){
                this.toastrService.error("Session Expired!!!")
                this.router.navigate(['/authentication/signin']);
              }else{
                this.toastrService.error("Already Exists!!!!");
              }
            })
        }else{
          if(this.viewAssign_selected.length > 0){
            this.calendarService.setScheduleDetails(this.calendarForm.value,timeSlot,this.viewAssign_selected,this.license_type.value)
            .subscribe(res=>{
              if(res['status'] == 'Success'){
                this.toastrService.success("Updated Successfully!!!!");
                this.dialogRef.close('submit');
              }else if(res['status'] == 'Session Expired'){
                this.toastrService.error("Session Expired!!!")
                this.router.navigate(['/authentication/signin']);
              }else{
                this.toastrService.error("Already Exists!!!!");
              }
            })
          }else{
            this.toastrService.error("Please Select the Schedule View Assignment!!")
          }
        }
    }else{
      this.toastrService.error("Please Select the Schedule Time!!")
    }
      
   
   }
   
  // ------------------------------------update schedule details-------------- 
   if(this.action == 'edit'){
      if(this.calendarForm.value.schedule_view == 'All'){
            let timeSlot='';
            for(let j=0;j<this.timeArray.length;j++){
              timeSlot=timeSlot+this.timeArray[j].checkValue;
            }
            this.calendarService.updateScheduleDetails(this.editInfo,timeSlot)
            .subscribe(res=>{
              if(res['status'] == 'Success'){
                this.toastrService.success("Updated Successfully!!!!")
                this.dialogRef.close('submit');
              }
              if(res['status'] == 'Session Expired'){
                this.toastrService.error("Session Expired!!!")
                this.router.navigate(['/authentication/signin']);
              }
            })
      }else{
          if(this.viewAssign_selected.length > 0){
            let assigneeName=[];
            let assigneeId=[];
            for(let i=0;i<this.viewAssign_selected.length;i++){
              assigneeName.push(this.viewAssign_selected[i].name);
              assigneeId.push(this.viewAssign_selected[i].id);
            }
              const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
                data:{
                  message: 'The Schedule will be updated for the selected Instructors',
                  dynamicMsg:assigneeName,
                  btnColor:"primary",
                  buttonText: {
                    ok: 'OK',
                    cancel: 'Cancel'
                  }
                }
              })
              dialogRef.afterClosed().subscribe((confirmed: boolean) => {
                if (confirmed) {
                  let timeSlot='';
                  for(let j=0;j<this.timeArray.length;j++){
                    timeSlot=timeSlot+this.timeArray[j].checkValue;
                  }
                  let itemTobeUpdated=this.editInfo.filter((elem)=>{return assigneeId.includes(elem.employee_id)});
                    this.calendarService.updateScheduleDetails(itemTobeUpdated,timeSlot)
                    .subscribe(res=>{
                      if(res['status'] == 'Success'){
                        this.toastrService.success("Updated Successfully!!!!")
                        this.dialogRef.close('submit');
                      }
                      if(res['status'] == 'Session Expired'){
                        this.toastrService.error("Session Expired!!!")
                        this.router.navigate(['/authentication/signin']);
                      }
                    })
                }
              });
          }else{
            this.toastrService.error("Please Select the Schedule View Assignment!!")
          }
      }   
   }
  }

  displayFn(user): string {
    return user && user.name ? user.name : '';
  }

  private _filterviewAssignType(obj): [] {
    const filterValue = obj.toLowerCase();
    return this.viewAssignTypeData.filter(option => option.name.toLowerCase().includes(filterValue));

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.viewAssign_selected.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.schedule_view_assignment.setValue('');
  }

  // ----------------delete particular instructor schedule--------------------

  remove(viewAssign: string): void {
    let insToDelete='';
    if (this.viewAssign_selected.findIndex(item => item.id === viewAssign) >= 0) {
      if(this.action == 'edit'){
        for(let i=0;i<this.viewAssignTypeData.length;i++){
          if(this.viewAssignTypeData[i].id==viewAssign){
            insToDelete=this.viewAssignTypeData[i].name;
          }
        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
          data:{
            message: 'Are you sure, want to delete the Schedule for the Instructor?',
            dynamicMsg:insToDelete +' schedule will be removed permanently',
            btnColor:"warn",
            buttonText: {
              ok: 'Yes',
              cancel: 'No'
            }
          }
        })
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            let objToDelete=this.editInfo.filter((elem)=>{return elem.employee_id==viewAssign});
             this.calendarService.deleteScheduleDetails(objToDelete)
              .subscribe(res=>{
                if(res['status'] == 'Success'){
                  this.toastrService.success("Deleted Successfully!!!!");
                  this.viewAssign_selected = [...this.viewAssign_selected.filter(fruit=>fruit.id !== viewAssign)];
                  for(let i=0;i<this.viewAssignTypeData.length;i++){
                    if(this.viewAssignTypeData[i].id==viewAssign){
                      this.viewAssignTypeData[i].checked=false;
                    }
                  }
                  this.dialogRef.close('delete');
                }
                if(res['status'] == 'Session Expired'){
                  this.toastrService.error("Session Expired!!!")
                  this.router.navigate(['/authentication/signin']);
                }
              })
          }
        });
      }else{
        this.viewAssign_selected = [...this.viewAssign_selected.filter(fruit=>fruit.id !== viewAssign)];
        for(let i=0;i<this.viewAssignTypeData.length;i++){
          if(this.viewAssignTypeData[i].id==viewAssign){
            insToDelete=this.viewAssignTypeData[i].name;
            this.viewAssignTypeData[i].checked=false;
          }
        }
      }
    } 
  }

  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    this.licenceInput.nativeElement.focus();
  }

  // -------------------------------------On selecting schedule view---------------

  selectedViewAssignment(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.viewValue;
    if (this.viewAssign_selected.findIndex(item => item.id === event.option.value) >= 0) {
      this.viewAssign_selected = [...this.viewAssign_selected.filter(fruit=>fruit.name !== newValue)];
      for(let i=0;i<this.viewAssignTypeData.length;i++){
        if(this.viewAssignTypeData[i].id==event.option.value){
          this.viewAssignTypeData[i].checked=false;
        }
      }
    } else {
      for(let i=0;i<this.viewAssignTypeData.length;i++){
        if(this.viewAssignTypeData[i].id==event.option.value){
          this.viewAssignTypeData[i].checked=true;
          this.viewAssign_selected.push(this.viewAssignTypeData[i]);
        }  
      }
    }


    if(this.viewAssign_selected.length > 1 ){
          let timeArr=[];
          this.timeSlotList=[];
          for(let j=0;j<this.editInfo.length;j++){
            for(let m=0;m<this.viewAssign_selected.length;m++){
              if(this.editInfo[j].employee_id == this.viewAssign_selected[m].id){
                timeArr.push(this.editInfo[j].TimeSlot);
                this.timeSlotList.push(this.editInfo[j].TimeSlot);
              }
            }
          }
          var result1 = timeArr.reduce(function(a, b) {
            return a || b;
          });
          for(let k=0;k<this.timeArray.length;k++){
          if(result1[k] == 1){
            this.timeArray[k].checkValue=1;
            this.timeArray[k].checked=true;
          }else{
            this.timeArray[k].checkValue=0;
            this.timeArray[k].checked=false;
          }
        }
    }else if(this.viewAssign_selected.length == 1 ){
          let timeData;
          for(let j=0;j<this.editInfo.length;j++){
            if(this.editInfo[j].employee_id == this.viewAssign_selected[0].id){
                timeData=this.editInfo[j].TimeSlot;
            }
          }
          for(let k=0;k<this.timeArray.length;k++){
            if(timeData[k] == 1){
              this.timeArray[k].checkValue=1;
              this.timeArray[k].checked=true;
            }else{
              this.timeArray[k].checkValue=0;
              this.timeArray[k].checked=false;
            }
          }
    }else{
        for(let k=0;k<this.timeArray.length;k++){
            this.timeArray[k].checkValue=0;
            this.timeArray[k].checked=false;
        }
    }
    this.licenceInput.nativeElement.value = '';
      this.schedule_view_assignment.setValue('');
    // keep the autocomplete opened after each item is picked.
    requestAnimationFrame(()=>{
      this.openAuto(this.matACTrigger);
    })

  }

  // -----------------get status list-----------------

  getScheduleList(){
    this.calendarService.getScheduleList()
    .subscribe(res=>{
        this.scheduleList=res['data'];
    })
  }

 
// -------------------------------On changing timeslot-----------------------------
  changeTimeDt(event: MatCheckboxChange, filter) {
    if (event.checked == true) {
      for(let i=0;i<this.timeArray.length;i++){
          if(this.timeArray[i].range == filter.range){
              this.timeArray[i].checkValue=1;
          }
      }
    }else{
      for(let i=0;i<this.timeArray.length;i++){
        if(this.timeArray[i].range == filter.range){
            this.timeArray[i].checkValue=0;
        }
      }
    }
  }


  

}
