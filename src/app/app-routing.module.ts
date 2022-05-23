import { Page404Component } from './authentication/page404/page404.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { Role } from './core/models/role';
const routes: Routes = [
  { path: '',loadChildren: () =>
      import('./authentication/authentication.module').then((m) => m.AuthenticationModule) },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'su',
        loadChildren: () =>
          import('./su/su-admin.module').then((m) => m.SuAdminModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./instructor/instructor.module').then((m) => m.InstructorModule),
      },
      
      {
        path: 'clerk',
        loadChildren: () =>
          import('./clerk/clerk.module').then((m) => m.ClerkModule),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'Profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'Track',
        loadChildren: () =>
          import('./timeline/timeline.module').then((m) => m.TimelineModule),
      },
     
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
