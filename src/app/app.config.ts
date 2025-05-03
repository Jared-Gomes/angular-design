import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const matIconRegistry = inject(MatIconRegistry);
        matIconRegistry.setDefaultFontSetClass('material-symbols-rounded');
        return () => Promise.resolve();
      },
    },
  ],
};
