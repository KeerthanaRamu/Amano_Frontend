import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  {
    path: 'apply',
    loadChildren: () =>
      import('./apply-license/apply-license.module').then((m) => m.ApplyLicenseModule),
  },
  {
    path: 'student-schedule',
    loadChildren: () =>
      import('./students-schedule/students-schedule.module').then((m) => m.StudentScheduleModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },

  {
    path: 'refund',
    loadChildren: () =>
      import('./refund-process/refund-process.module').then((m) => m.RefundProcessModule),
  },
  {
    path: 'license-process',
    loadChildren: () =>
      import('./license-process/license-process.module').then((m) => m.LicenseProcessModule),
  },
  {
    path: 'GDL',
    loadChildren: () =>
      import('./GDL-apply-license/GDL-apply-license.module').then((m) => m.GdlApplyLicenseModule),
  },
  {
    path: 'renewal',
    loadChildren: () =>
      import('./renewal-process/renewal-process.module').then((m) => m.RenewalProcessModule),
  },

  {
    path: 'generate',
    loadChildren: () =>
      import('./generate-lform/generate-lform.module').then((m) => m.GenerateLFormModule),
  },
  
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  // },
  // {
  //   path: 'Profile',
  //   loadChildren: () =>
  //     import('./profile/profile.module').then((m) => m.ProfileModule),
  // },
 
  // {
  //   path: 'students',
  //   loadChildren: () =>
  //     import('./students/students.module').then((m) => m.StudentsModule),
  // },
  // {
  //   path: 'license',
  //   loadChildren: () =>
  //     import('./license/license.module').then((m) => m.LicenseModule),
  // },
  // {
  //   path: 'package',
  //   loadChildren: () =>
  //     import('./package/package.module').then((m) => m.PackageModule),
  // },
  // {
  //   path: 'pre-requisite',
  //   loadChildren: () =>
  //     import('./pre-requisite/pre-requisite.module').then((m) => m.PreRequisiteModule),
  // },
  // {
  //   path: 'employee',
  //   loadChildren: () =>
  //     import('./employee/employee.module').then((m) => m.EmployeeModule),
  // },
  // {
  //   path: 'schedule',
  //   loadChildren: () =>
  //     import('./schedule/schedule.module').then((m) => m.ScheduleModule),
  // },
  // {
  //   path: 'retest',
  //   loadChildren: () =>
  //     import('./retest-payment/retest-payment.module').then((m) => m.RetestPaymentModule),
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClerkRoutingModule {}
