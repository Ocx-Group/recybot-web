import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from "@app/authentication/contact/contact.component";
import { TeamComponent } from "@app/authentication/team/team.component";
import { TestimonialsComponent } from "@app/authentication/testimonials/testimonials.component";
import { AuthGuard } from '@app/core/guard/auth.guard';
import { MaintenanceGuard } from '@app/core/guard/maintenance.guard';
import { ConpaymentConfirmationComponent } from './conpayment-confirmation/conpayment-confirmation.component';
import { EmailConfirmationComponent } from './email-confirmation/email.confirmation.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainOptionsComponent } from './main-options/main-options.component';
import { MaintenancePageComponent } from './maintenance-page/maintenance-page.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ProductsPreviewComponent } from './products-preview/products-preview.component';
import { ResetComponent } from './reset/reset.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

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
    path: 'welcome/:key',
    component: LandingPageComponent
  },
  {
    path: 'products-preview',
    component: ProductsPreviewComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}
