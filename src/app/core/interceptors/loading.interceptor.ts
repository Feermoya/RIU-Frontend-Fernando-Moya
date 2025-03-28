import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, delay } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.mostrar();

    return next.handle(request).pipe(
      // simula que tarda 1 segundo
      delay(1000),
      finalize(() => this.loadingService.ocultar()),
    );
  }
}
