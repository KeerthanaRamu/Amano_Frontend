import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AboutStudentComponent } from './about-student/about-student.component';

const routes: Routes = [
  {
    path: 'view',
    component: AllStudentsComponent
  },
  {
    path: 'about-student/:id',
    component: AboutStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
