import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component'
import { TimelineRoutingModule } from './timeline-routing.module';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [TimelineComponent],
  imports: [CommonModule, TimelineRoutingModule,
    MatMenuModule,MatButtonModule,MatIconModule,MaterialFileInputModule,
    FormsModule,ReactiveFormsModule,
    MatSelectModule,MatSnackBarModule,MatInputModule,NgxSpinnerModule,MatDialogModule,
    MatFormFieldModule,MatCheckboxModule,MatTabsModule,MatAutocompleteModule,TranslateModule,MatRadioModule,MatTooltipModule,
    NgxStarRatingModule
],
})
export class TimelineModule {}
