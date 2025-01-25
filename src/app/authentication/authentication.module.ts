import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from "@app/shared/shared.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import {
  Facebook, Github,
  Gitlab, Key, Mail, Twitter, User, UserCheck
} from 'angular-feather/icons';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ConpaymentConfirmationComponent } from './conpayment-confirmation/conpayment-confirmation.component';
import { ContactComponent } from './contact/contact.component';
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
import { TeamComponent } from './team/team.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

const icons = {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Key,
  UserCheck,
  Mail,
};


@NgModule({
  declarations: [
    LandingPageComponent,
    SigninComponent,
    SignupComponent,
    ForgotComponent,
    Page500Component,
    Page404Component,
    ResetComponent,
    EmailConfirmationComponent,
    MainOptionsComponent,
    MaintenancePageComponent,
    ConpaymentConfirmationComponent,
    ProductsPreviewComponent,
    TeamComponent,
    ContactComponent,
    TestimonialsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    PerfectScrollbarModule,
    TranslateModule,
    FeatherModule.pick(icons),
    MatSelectCountryModule.forRoot('en'),
    MatSelectModule,
    FontAwesomeModule,
    NgbCollapse,
    SharedModule
  ]
})
export class AuthenticationModule {
}
