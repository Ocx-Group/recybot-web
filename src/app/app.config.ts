import {
  ApplicationConfig,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { firebaseConfig } from '@environments/environment';

// Translate
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Loading Bar
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// Toastr
import { provideToastr } from 'ngx-toastr';

// Routes
import { routes } from './app.routes';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    { provide: LocationStrategy, useClass: PathLocationStrategy },

    // Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),

    // Translate
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      LoadingBarRouterModule,
    ),

    // Language initialization
    {
      provide: APP_INITIALIZER,
      useFactory: initialLanguage,
      deps: [TranslateService],
      multi: true,
    },
  ],
};
