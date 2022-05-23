import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
// import { Dashboard2Component } from './dashboard2/dashboard2.component';
const routes: Routes = [
  {
    path: 'client-list',
    component: ClientListComponent,
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
export class ClientRoutingModule {}
