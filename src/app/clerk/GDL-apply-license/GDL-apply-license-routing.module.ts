import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GdlApplyLicenseComponent } from './GDL-apply-license.component';


const routes: Routes = [
  {
    path: 'Gdl-apply-license',
    component: GdlApplyLicenseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GdlApplyLicenseRoutingModule {}
