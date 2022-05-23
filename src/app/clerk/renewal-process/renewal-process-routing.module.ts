import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenewalProcessComponent } from './renewal-process.component'; 


const routes: Routes = [
  {
    path: 'renewal-process',
    component: RenewalProcessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewalProcessRoutingModule {}
