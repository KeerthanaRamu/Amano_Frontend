import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';
import { RegistrationReportComponent } from './registration-report/registration-report.component';

const routes: Routes = [
  {
    path: 'revenue-report',
    component: RevenueReportComponent
  },
  {
    path: 'registration-report',
    component: RegistrationReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
