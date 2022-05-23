import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundComponent } from './refund/refund.component'; 


const routes: Routes = [
  {
    path: 'refund-process',
    component: RefundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundProcessRoutingModule {}
