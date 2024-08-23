import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResetComponent } from './reset/reset.component';
import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';
import { ForgotComponent } from './forgot/forgot.component';
import { EmailConfirmationComponent } from './email-confirmation/email.confirmation.component';
import { MainOptionsComponent } from './main-options/main-options.component';
import { ConpaymentConfirmationComponent } from './conpayment-confirmation/conpayment-confirmation.component';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { MaintenancePageComponent } from './maintenance-page/maintenance-page.component';
import { environment } from '@environments/environment';
import { AuthGuardAdmin } from '@app/core/guard/auth.guard.admin';
import { MaintenanceGuard } from '@app/core/guard/maintenance.guard';
import { WhitePaperComponent } from './white-paper/white-paper.component';
import { ProductsPreviewComponent } from './products-preview/products-preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'maintenance',
    component: MaintenancePageComponent,
  },
  {
    path: 'user_confirm/:userName',
    component: EmailConfirmationComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [MaintenanceGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signup/:key',
    component: SignupComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  {
    path: 'reset/:verificationCode',
    component: ResetComponent,
  },
  {
    path: 'page404',
    component: Page404Component,
  },
  {
    path: 'page500',
    component: Page500Component,
  },
  {
    path: 'main-options/:userName',
    component: MainOptionsComponent,
  },
  {
    path: 'conpayment-confirmation',
    component: ConpaymentConfirmationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'welcome',
    component: LandingPageComponent
  },
  {
    path: 'white-papper',
    component: WhitePaperComponent
  },
  {
    path: 'products-preview',
    component: ProductsPreviewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
