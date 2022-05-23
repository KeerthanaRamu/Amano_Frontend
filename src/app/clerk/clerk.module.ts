import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClerkRoutingModule,TranslateModule,NgxDatatableModule],
})
export class ClerkModule {}
