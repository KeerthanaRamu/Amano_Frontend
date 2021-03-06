import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AboutStudentComponent } from './about-student/about-student.component';

const routes: Routes = [
  {
    path: 'all-students',
    component: AllStudentsComponent
  },
  {
    path: 'add-student',
    component: AddStudentComponent
  },
  {
    path: 'edit-student/:id',
    component: EditStudentComponent
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
