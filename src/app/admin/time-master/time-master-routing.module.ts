import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTimeComponent } from './add-time/add-time.component';

const routes: Routes = [
  {
    path: 'add-time',
    component: AddTimeComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeMasterRoutingModule {}
