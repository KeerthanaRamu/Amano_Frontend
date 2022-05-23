import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'license',
    loadChildren: () =>
      import('./license/license.module').then((m) => m.LicenseModule),
  },
  {
    path: 'package',
    loadChildren: () =>
      import('./package/package.module').then((m) => m.PackageModule),
  },
  {
    path: 'pre-requisite',
    loadChildren: () =>
      import('./pre-requisite/pre-requisite.module').then((m) => m.PreRequisiteModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'retest',
    loadChildren: () =>
      import('./retest-payment/retest-payment.module').then((m) => m.RetestPaymentModule),
  },
  {
    path: 'message',
    loadChildren: () =>
      import('./message/message.module').then((m) => m.MessageModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },

  {
    path: 'time',
    loadChildren: () =>
      import('./time-master/time-master.module').then((m) => m.TimeMasterModule),
  },
  
  {
    path: 'refund',
    loadChildren: () =>
      import('./refund/refund.module').then((m) => m.RefundModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
