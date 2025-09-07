import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  // provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideClientHydration(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
};
