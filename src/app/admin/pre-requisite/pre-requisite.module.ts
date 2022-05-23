import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreRequisiteRoutingModule } from './pre-requisite-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { PreRequisiteListComponent } from './pre-requisite-list/pre-requisite-list.component';
import { AddPreRequisiteComponent } from './add-pre-requisite/add-pre-requisite.component';
import { EditPreRequisiteComponent } from './edit-pre-requisite/edit-pre-requisite.component';
import { TranslateModule } from '@ngx-translate/core';
import{PreRequisiteService} from './pre-requisite.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    PreRequisiteListComponent,
    AddPreRequisiteComponent,
    EditPreRequisiteComponent
  ],
  imports: [CommonModule, PreRequisiteRoutingModule,NgxSpinnerModule,
    MatMenuModule,MatButtonModule,MatIconModule,MaterialFileInputModule,
    FormsModule,ReactiveFormsModule,
    MatSelectModule,MatSnackBarModule,MatInputModule,MatAutocompleteModule,
    MatFormFieldModule,MatCheckboxModule,MatTabsModule,TranslateModule,NgxDatatableModule,MatDialogModule,MatChipsModule
],
providers: [PreRequisiteService],
})
export class PreRequisiteModule {}
