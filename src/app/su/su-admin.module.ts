import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuAdminRoutingModule } from './su-admin-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule, SuAdminRoutingModule,
    MatFormFieldModule,MatInputModule,NgxSpinnerModule],
})
export class SuAdminModule {}
   