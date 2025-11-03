import { LocationStrategy, NgOptimizedImage, PathLocationStrategy } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MembershipManagerModule } from "./client/membership-manager/membership-manager.module";
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initialLanguage(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('lang') || 'en';
    translate.use(savedLang);
    localStorage.setItem('lang', savedLang);
  };
}

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ScrollingModule,
        LoadingBarRouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
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
        NgOptimizedImage,
        PageLoaderComponent], providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
            provide: APP_INITIALIZER,
            useFactory: initialLanguage,
            deps: [TranslateService],
            multi: true
        },
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideStorage(() => getStorage()),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
