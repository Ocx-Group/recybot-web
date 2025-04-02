import { __decorate } from "tslib";
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layout/app-layout/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthGuardAdmin } from './core/guard/auth.guard.admin';
const routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/welcome', pathMatch: 'full' },
            {
                path: 'app',
                loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
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
                loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
            }
        ],
    },
    {
        path: '',
        component: AuthLayoutComponent,
        loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, {})],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map