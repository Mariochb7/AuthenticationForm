import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> {
    //modifying the outgoing request also can be used to check the information coming back from the server
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    // console.log(modifiedReq);
    //to watch for events around our request ( sent , received , etc..)
    /* return next(modifiedReq).pipe(
      tap((val) => {
        //console.log(val);
        if (val.type === HttpEventType.Sent)
          console.log('Request was sent to server');
        if (val.type === HttpEventType.Response)
          console.log('Response from the api : ', val);
      })
    );*/
    return next(modifiedReq);
  }
}

// Create a function that returns the `intercept` method as an `HttpInterceptorFn`
export const authHttpInterceptorFn: HttpInterceptorFn = (req, next) =>
  new AuthHttpInterceptor().intercept(req, next);
