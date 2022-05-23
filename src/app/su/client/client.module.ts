import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClientRoutingModule } from './client-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ClientListComponent } from './client-list/client-list.component';
import {ClientService} from '../client/client.service'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ClientListComponent
  ],  
  imports: [
    CommonModule,NgxDatatableModule,MatFormFieldModule,NgxSpinnerModule,
    ClientRoutingModule,FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    NgApexchartsModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,MatSnackBarModule,MatSelectModule,MaterialFileInputModule
  ],
  providers: [ClientService],
})
export class ClientModule {}
