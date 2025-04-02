
import { LocationStrategy, NgOptimizedImage, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseConfig } from '@environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {
  PerfectScrollbarConfigInterface, PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { ClientModule } from './client/client.module';
import { MembershipManagerModule } from "./client/membership-manager/membership-manager.module";
import { AdminLayoutComponent } from './layout/app-layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderAdminComponent } from './layout/header-admin/header-admin.component';
import { HeaderComponent } from './layout/header/header.component';
import { ImgProfileComponent } from './layout/img-profile/img-profile.component';
import { LogoComponent } from './layout/logo/logo.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { SidebarAdminComponent } from './layout/sidebar-admin/sidebar-admin.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TermsConditionsModalComponent } from './layout/terms-conditions-modal/terms-conditions-modal.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function initialLanguage(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('lang') || 'en';
    translate.use(savedLang);
    localStorage.setItem('lang', savedLang);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderAdminComponent,
    PageLoaderComponent,
    SidebarComponent,
    SidebarAdminComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    FooterComponent,
    LogoComponent,
    ImgProfileComponent,
    TermsConditionsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    LoadingBarRouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // core & shared
    CoreModule,
    ToastrModule.forRoot(),
    SharedModule,
    NgbModule,
    ClipboardModule,
    MembershipManagerModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
    ClientModule,
    NgxDropzoneModule,
    NgOptimizedImage,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initialLanguage,
      deps: [TranslateService],
      multi: true
    }
  ],
  exports: [LogoComponent, ImgProfileComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
