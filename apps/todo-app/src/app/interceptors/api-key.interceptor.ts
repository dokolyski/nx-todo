import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestWithKey = request.clone({
      url: this.insertApiKeyIntoUrl(request.url),
    });
    return next.handle(requestWithKey);
  }

  private insertApiKeyIntoUrl(url: string): string {
    const keyPosition = url.indexOf('/', 1) + 1;
    return `${url.slice(0, keyPosition)}${environment.api}${url.slice(
      keyPosition - 1
    )}`;
  }
}
