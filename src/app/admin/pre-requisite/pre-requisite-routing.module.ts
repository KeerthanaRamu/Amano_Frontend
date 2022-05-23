import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreRequisiteListComponent } from './pre-requisite-list/pre-requisite-list.component';
import { AddPreRequisiteComponent } from './add-pre-requisite/add-pre-requisite.component';
import { EditPreRequisiteComponent } from './edit-pre-requisite/edit-pre-requisite.component';


const routes: Routes = [
  {
    path: 'pre-requisite-list',
    component: PreRequisiteListComponent
  },
  {
    path: 'add-pre-requisite',
    component: AddPreRequisiteComponent
  },
  {
    path: 'edit-pre-requisite/:id',
    component: EditPreRequisiteComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreRequisiteRoutingModule {}
