import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetestPaymentListComponent } from './retest-payment-list/retest-payment-list.component';
// import { Dashboard2Component } from './dashboard2/dashboard2.component';
const routes: Routes = [
  {
    path: 'retest-payment-list',
    component: RetestPaymentListComponent,
  },
  // {
  //   path: 'dashboard2',
  //   component: Dashboard2Component,
  // }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetestPaymentRoutingModule {}
