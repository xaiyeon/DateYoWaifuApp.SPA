import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { error } from 'util';

// Our new way to handle errors

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch(error => {
      // now for error of 400
      if (error.status === 400) {
        return Observable.throw(error._body);
      }
      const applicationError = error.headers.get('Application-Error');
      if (applicationError) {
        return Observable.throw(applicationError);
      }
      const serverError = error.error;
      let modelStateErrors = '';
      if (serverError && typeof serverError === 'object') {
        for (const key in serverError) {
          if (serverError[key]) {
            modelStateErrors += serverError[key] + '\n';
          }
        }
      }
      return Observable.throw(modelStateErrors || serverError || 'Server Error');
    });
  }
}

// multi true doesn't override current, but adds on to current existing
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
