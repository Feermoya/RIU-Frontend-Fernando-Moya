import { fakeAsync, tick } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor;
  const loadingServiceMock = {
    mostrar: jasmine.createSpy('mostrar'),
    ocultar: jasmine.createSpy('ocultar'),
  };

  beforeEach(() => {
    interceptor = new LoadingInterceptor(loadingServiceMock as any);
  });

  it('debería llamar a mostrar y ocultar del loadingService', fakeAsync(() => {
    const reqMock = {} as HttpRequest<any>;
    const nextMock: HttpHandler = {
      handle: () => of(new HttpResponse({ status: 200, body: 'ok' })),
    };
    interceptor.intercept(reqMock, nextMock).subscribe(() => {});
    expect(loadingServiceMock.mostrar).toHaveBeenCalled();
    tick(1000);
    expect(loadingServiceMock.ocultar).toHaveBeenCalled();
  }));
});
