import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageListComponent } from './package-list/package-list.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { EditPackageComponent } from './edit-package/edit-package.component';

const routes: Routes = [
  {
    path: 'package-list',
    component: PackageListComponent
  },
  {
    path: 'add-package',
    component: AddPackageComponent
  },
  {
    path: 'edit-package/:id',
    component: EditPackageComponent
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
export class PackageRoutingModule {}
