import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';

import { AdminRoutingModule } from './admin-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule,TranslateModule,NgxDatatableModule,NgxMatTimepickerModule],
})
export class AdminModule {}
