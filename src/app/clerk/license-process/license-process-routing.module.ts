import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseProcessComponent } from './license-process.component'; 


const routes: Routes = [
  {
    path: 'license-process',
    component: LicenseProcessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseProcessRoutingModule {}
