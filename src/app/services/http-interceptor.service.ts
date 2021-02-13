import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor() { }

  private addToken = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  };

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = environment.Authorization;
    return next.handle(this.addToken(httpRequest, token))
  }
}
