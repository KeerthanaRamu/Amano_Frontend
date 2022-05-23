import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
// import { Dashboard2Component } from './dashboard2/dashboard2.component';
const routes: Routes = [
  {
    path: '',
    component: MessageComponent,
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
export class MessageRoutingModule {}