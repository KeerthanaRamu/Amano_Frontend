import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaskModule } from 'ngx-mask';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleService } from './schedule.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatChipsModule} from '@angular/material/chips';
import { FullCalendarModule } from "@fullcalendar/angular";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";  
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { NgxSpinnerModule } from 'ngx-spinner';

import { FormDialogComponent as calFormComponent } from "./dialogs/form-dialog/form-dialog.component";
import { RemarksDialogComponent } from './dialogs/remarks-dialog/remarks-dialog.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);


@NgModule({
  declarations: [
    AddScheduleComponent,calFormComponent,RemarksDialogComponent
  ],
  imports: [NgxDatatableModule,MatChipsModule,
    CKEditorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,  
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MaterialFileInputModule,
    ScheduleRoutingModule,
    MatProgressSpinnerModule,MatStepperModule,
    NgxMaskModule,TranslateModule,
    MatAutocompleteModule,
    FullCalendarModule, OwlDateTimeModule,
    OwlNativeDateTimeModule,NgxSpinnerModule
  ],
  providers: [ScheduleService],
})
export class ScheduleModule {}
