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
import { ApplyLicenseRoutingModule } from './apply-license-routing.module';
import { ApplyLicenseService } from './apply-license.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SelectLicenseComponent } from './select-license/select-license.component';
import { SelectPacakgeComponent } from './select-pacakge/select-pacakge.component';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { ReceiptDialogComponent } from './receipt-dialog/receipt-dialog.component';
import { ViewPackageFlowComponent } from './view-package-flow/view-package-flow.component';

@NgModule({
  declarations: [
    SelectLicenseComponent,
    SelectPacakgeComponent,
    ReceiptDialogComponent,
    ViewPackageFlowComponent
  ],
  imports: [
    NgxSpinnerModule,MatCardModule,MatDividerModule,MatRadioModule,NgImageFullscreenViewModule,
    NgxDatatableModule,
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
    ApplyLicenseRoutingModule,
    MatProgressSpinnerModule,MatStepperModule,
    NgxMaskModule,TranslateModule,
    MatAutocompleteModule
  ],
  providers: [ApplyLicenseService],
})
export class ApplyLicenseModule {}
