import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layout/app-layout/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthGuardAdmin } from './core/guard/auth.guard.admin';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      {
        path: 'app',
        loadChildren: () =>
          import('./client/client.routes').then((m) => m.CLIENT_ROUTES),
      }
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardAdmin],
    children: [
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      }
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.routes').then(
        (m) => m.AUTHENTICATION_ROUTES
      ),
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
