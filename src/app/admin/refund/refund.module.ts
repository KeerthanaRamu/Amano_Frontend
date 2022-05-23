import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { RefundRoutingModule } from './refund-routing.module'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RefundService } from './refund.service';
import { TranslateModule } from '@ngx-translate/core';
import { RefundListComponent } from './refund-list/refund-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    
  
    RefundListComponent
  ],
  imports: [
    CommonModule,MatAutocompleteModule,NgxDatatableModule,
    MatFormFieldModule,MatInputModule,MatSnackBarModule,MatSelectModule,FormsModule,
    ReactiveFormsModule,MaterialFileInputModule,
    RefundRoutingModule,TranslateModule,NgxSpinnerModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    NgApexchartsModule,
    MatButtonModule,
    MatMenuModule,
  ],providers: [RefundService],
})
export class RefundModule {}
