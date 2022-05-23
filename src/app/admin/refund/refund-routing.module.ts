import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundListComponent } from './refund-list/refund-list.component';

const routes: Routes = [
  {
    path: 'refund-list',
    component: RefundListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefundRoutingModule {}
