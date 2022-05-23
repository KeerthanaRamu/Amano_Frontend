import { Component, ViewChild, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { Calendar } from '../schedule.model';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  scheduleList;
  

  dialogTitle: string;
  filterOptions = 'All';
  calendarData=[];
  filterItems =[]
  checkAll:boolean=true;
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  timeArray: any[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: ScheduleService,
    private snackBar: MatSnackBar,
    private spinner:NgxSpinnerService,
    private router:Router,private toastrService: ToastrService,
    private deviceService: DeviceDetectorService
  ) {
    super();
    this.dialogTitle = 'Add New Event';
    this.calendar = new Calendar({});
    this.addCusForm = this.createCalendarForm(this.calendar);
    this.getScheduleList();
    this.getTimeDetails();

  }

  public ngOnInit(): void {
    
    this.getScheduleDetails();
    
  }

  // ----------------------get list of schedule-----------------
  getScheduleDetails(){
    this.calendarData=[];
    this.calendarService.getScheduleDetails()
    .subscribe(res=>{
      if(res['status'] == 'Success'){
        for(let i=0;i<res['data'].length;i++){
          this.calendarData.push({
            title: res['data'][i].status+' - '+res['data'][i].license_class,
            start: new Date(res['data'][i].startDate),
            end: new Date(res['data'][i].endDate),  
            className: res['data'][i].schedule_color,
            id: res['data'][i].id,
            lead_time: res['data'][i].lead_time,
            schedule_name: res['data'][i].status_id,
            schedule_view:res['data'][i].schedule_view,
            assignment:res['data'][i].AssignmentList,
            startDate: new Date(res['data'][i].startDate), 
            endDate: new Date(res['data'][i].endDate),
            license_id:res['data'][i].license_id
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

// -----------------------------------get status list-------------
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

  // --------------------Calendar configurations----------------------

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
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    this.addNewEvent(selectInfo);
  }

  addNewEvent(selectInfo) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: selectInfo,
        timeData:this.timeArray,
        action: 'add',
      },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.getScheduleDetails();
      }
    });
  }

  // ---------------------------On changing filter-----------------------------

  changeCategory(event: MatCheckboxChange, filter) {
    if (event.checked) {
      this.filterItems.push(filter.status);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.status), 1);
    }
    this.filterEvent(this.filterItems);
  }

  // -------------------------filter check/uncheck all---------------------

  changeAll(event: MatCheckboxChange){
    if (event.checked == true) {
        this.checkAll=true;
        for(let i=0;i<this.scheduleList.length;i++){
          this.scheduleList[i].checked=true;
          this.filterItems.push(this.scheduleList[i].status)
        }
        this.filterEvent(this.filterItems);
    }else{
        this.checkAll=false;
        for(let i=0;i<this.scheduleList.length;i++){
          this.scheduleList[i].checked=false;
        }
        this.filterItems=[];
        this.filterEvent(this.filterItems);
    }
  }

  filterEvent(element) {
    const list = this.calendarEvents.filter((x) =>
      element.map((y) => y).includes((x.title).split(' - ')[0])
    );

    this.calendarOptions.events = list;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row) {
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      lead_time: row.event._def.extendedProps.lead_time,
      schedule_name: row.event._def.extendedProps.schedule_name,
      schedule_view:row.event._def.extendedProps.schedule_view,
      schedule_view_assignment:row.event._def.extendedProps.assignment,
      startDate: row.event._def.extendedProps.startDate,
      endDate: row.event._def.extendedProps.endDate,
      license_id:row.event._def.extendedProps.license_id
    };

    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

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
        this.getScheduleDetails();
        this.addCusForm.reset();
      } else if (result === 'delete') {
        this.getScheduleDetails();
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

// ---------------------------------------get time list-----------------
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
        r.push({'range':previous + ' - ' + current,'checked':false,'checkValue':0});
        previous = current;
  } while (currentHr !== endHr);
      var restTime=restStart+' - '+ restEnd;
      this.timeArray=r.filter((el)=>{return el.range != restTime});
};



}
