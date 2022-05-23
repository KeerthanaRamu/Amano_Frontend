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
  scheduleList=[];

  dialogTitle: string;
  filterOptions = 'All';
  calendarData=[];
  filterItems =[]
  timeArray: any[];

  calendarEvents: EventInput[];
  tempEvents: EventInput[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: ScheduleService,
    private snackBar: MatSnackBar,
    private deviceService: DeviceDetectorService
  ) {
    super();
    this.dialogTitle = 'Add New Event';
    this.calendar = new Calendar({});
    this.addCusForm = this.createCalendarForm(this.calendar);

  }

  public ngOnInit(): void {
    console.log("this.deviceService.isDesktop()----",this.deviceService.isDesktop())
    this.getScheduleDetails();
    this.getTimeDetails();
  }

  getScheduleDetails(){
    this.calendarData=[];
    this.calendarService.getScheduleDetailsForInstructor()
    .subscribe(res=>{
      console.log("----res['data']----",res['data'])
      for(let i=0;i<res['data'].length;i++){
        if (!this.scheduleList.some(x => x.status == res['data'][i].status)) {
            this.scheduleList.push({
              'status':res['data'][i].status,
              'checked':true
            });
            this.filterItems.push(res['data'][i].status)
        }
        this.calendarData.push({
          // id: res['data'][i].id,
          title: res['data'][i].status + ' - ' + res['data'][i].license_class,
          start: new Date(res['data'][i].startDate),
          end: new Date(res['data'][i].endDate),  
          className: res['data'][i].schedule_color,
          id: res['data'][i].id,
          lead_time: res['data'][i].lead_time,
          schedule_name: res['data'][i].schedule_id,
          schedule_view:res['data'][i].schedule_view,
          schedule_view_assignment:res['data'][i].schedule_assignment,
          startDate: new Date(res['data'][i].startDate),
          endDate: new Date(res['data'][i].endDate),
          statusid:res['data'][i].status_id,
          license_id:res['data'][i].license_id
        })
      }
      this.calendarEvents=this.calendarData;
      this.tempEvents = this.calendarEvents;
      this.calendarOptions.events = this.calendarEvents;
    })
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
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),

  };



  

  changeCategory(event: MatCheckboxChange, filter) {
    console.log("---------",filter,this.filterItems,event.checked)
    if (event.checked) {
      this.filterItems.push(filter.status);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.status), 1);
    }
    this.filterEvent(this.filterItems);
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
    console.log("row===",row.event._def.extendedProps);
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      license_id:row.event._def.extendedProps.license_id,
      statusid:row.event._def.extendedProps.statusid,
      schedule_name: row.event._def.extendedProps.schedule_name,
      startDate: row.event.start,
    };

    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    for(let i=0;i<this.timeArray.length;i++){
      this.timeArray[i].studentList=[];
    }

    const dialogRef = this.dialog.open(FormDialogComponent, {
      
      data: {
        calendar: calendarData,
        timeData:this.timeArray,
        action: 'edit',
      },
      direction: tempDirection,
      
    });
    dialogRef.updateSize("1000px", "500px");


    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.getScheduleDetails();
        this.addCusForm.reset();
      } else if (result === 'delete') {
        this.getScheduleDetails();
      }
    });
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
      // schedule_owner:[calendar.schedule_owner],
      schedule_view: [calendar.schedule_view],
      schedule_view_assignment:[calendar.schedule_view_assignment],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getTimeDetails(){
    this.calendarService.getTimeDetails()
    .subscribe((res)=>{
        let resObj=res['data'][0];
        console.log("resObj---",resObj)
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
        r.push({'range':previous + ' - ' + current,'checkValue':0,studentList:[]});
        previous = current;
  } while (currentHr !== endHr);
      var restTime=restStart+' - '+ restEnd;
      this.timeArray=r.filter((el)=>{return el.range != restTime});
};



}
