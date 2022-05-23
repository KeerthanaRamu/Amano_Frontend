import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { PendingReportComponent } from './pending-report/pending-report.component';
import { PendingScheduleComponent } from './pending-schedule/pending-schedule.component';

const routes: Routes = [
  {
    path: 'sales-report',
    component: SalesReportComponent
  },
  {
    path: 'pending-report',
    component: PendingReportComponent
  },
  {
    path: 'pending-schedule',
    component: PendingScheduleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
