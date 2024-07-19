import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideClientHydration } from '@angular/platform-browser';
import { firebaseConfig } from './shared/constants/firebase';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([
      //firebase module
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFireStorageModule,

      CommonModule,
      ReactiveFormsModule,
      RouterModule,
    ]),
  ],
};
