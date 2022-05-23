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
import { GdlApplyLicenseService } from './GDL-apply-license.service'; 
import { GdlApplyLicenseRoutingModule } from './GDL-apply-license-routing.module';
import { GdlApplyLicenseComponent } from './GDL-apply-license.component'; 

@NgModule({
  declarations: [
  
    GdlApplyLicenseComponent
  ],
  imports: [
    NgxSpinnerModule,MatCardModule,MatRadioModule,
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
    MatAutocompleteModule,GdlApplyLicenseRoutingModule
  ],
  providers: [GdlApplyLicenseService],
})
export class GdlApplyLicenseModule {}
