import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateFormComponent } from './generate-form/generate-form.component';

const routes: Routes = [
    {
      path: 'lform',
      component: GenerateFormComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateLFormRoutingModule {}
