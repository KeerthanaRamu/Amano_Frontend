import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import {ReportsService} from './reports.service';
import {ReportsRoutingModule} from './reports-routing.module';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { PendingReportComponent } from './pending-report/pending-report.component';
import {PendingScheduleComponent} from './pending-schedule/pending-schedule.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    SalesReportComponent,PendingReportComponent,PendingScheduleComponent
  ],
  imports: [
    NgxSpinnerModule,MatCardModule,MatRadioModule,MatTooltipModule,
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,  
    MatDatepickerModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ,TranslateModule,
    MatAutocompleteModule,ReportsRoutingModule,MatSelectModule
  ],
  providers: [ReportsService],
})
export class ReportsModule {}
