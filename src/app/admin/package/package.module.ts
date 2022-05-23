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
import { PackageRoutingModule } from './package-routing.module';
import { PackageService } from './package.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PackageListComponent } from './package-list/package-list.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { EditPackageComponent } from './edit-package/edit-package.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatChipsModule} from '@angular/material/chips';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    // DeleteDialogComponent,
    // FormDialogComponent,
  
    PackageListComponent,
    AddPackageComponent,
    EditPackageComponent
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
    PackageRoutingModule,
    MatProgressSpinnerModule,MatStepperModule,
    NgxMaskModule,TranslateModule,
    MatAutocompleteModule,NgxSpinnerModule
  ],
  providers: [PackageService],
})
export class PackageModule {}
