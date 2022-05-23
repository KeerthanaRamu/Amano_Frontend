import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
// import { Dashboard2Component } from './dashboard2/dashboard2.component';
const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
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
export class UserRoutingModule {}
