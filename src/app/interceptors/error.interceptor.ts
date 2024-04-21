import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400: {
              if(err.error.errors) {
                this.toastr.error('Invalid request, take a look at dev console', err.status.toString());
                break;
              }
              if(err.error.errorMessage) {
                this.toastr.error(err.error.errorMessage, err.status.toString());
              }
              break;
            }
            case 401: {
              this.toastr.error('No acess to this page', 'Unauthorized');
              this.router.navigateByUrl('/no-acess');
              break;
            }
            case 404: {
              if (err.error.errorMessage) {
                this.toastr.error(
                  err.error.errorMessage,
                  err.status.toString()
                );
              }

              this.router.navigateByUrl('/not-found');
              break;
            }
            case 500: {
              const navigationExtras: NavigationExtras = {
                state: { error: err.error.details },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            }
            default:
              this.toastr.error('Something unexpected happened');
              console.log(err);
              break;
          }
        }
        throw err;
      })
    );
  }
}
