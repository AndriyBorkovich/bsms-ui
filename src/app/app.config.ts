import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { User } from './models/user';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export function tokenGetter() {
  let user : User | null = JSON.parse(localStorage.getItem('user'));
  return user?.token;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    importProvidersFrom(
      JwtModule.forRoot({ config: {
        tokenGetter: tokenGetter
      }})),
  ],
};
