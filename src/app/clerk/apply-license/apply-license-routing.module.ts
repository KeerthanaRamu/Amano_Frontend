import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectLicenseComponent } from './select-license/select-license.component';
import { SelectPacakgeComponent } from './select-pacakge/select-pacakge.component';
import { ViewPackageFlowComponent } from './view-package-flow/view-package-flow.component';

const routes: Routes = [
  {
    path: 'license',
    component: SelectLicenseComponent
  },
  {
    path: 'package',
    component: SelectPacakgeComponent
  },
  {
    path: 'package-flow',
    component: ViewPackageFlowComponent
  },
  
  // {
  //   path: 'edit-student/:id',
  //   component: EditStudentComponent
  // },
  // {
  //   path: 'about-student/:id',
  //   component: AboutStudentComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyLicenseRoutingModule {}
