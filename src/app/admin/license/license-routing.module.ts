import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { AddLicenseComponent } from './add-license/add-license.component';
import { EditLicenseComponent } from './edit-license/edit-license.component';

const routes: Routes = [
  {
    path: 'license-list',
    component: LicenseListComponent
  },
  {
    path: 'add-license',
    component: AddLicenseComponent
  },
  {
    path: 'edit-license/:id',
    component: EditLicenseComponent
  },
  // {
  //   path: 'about-student',
  //   component: AboutStudentComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule {}
