import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería emitir true al llamar a mostrar()', (done) => {
    service.loading$.subscribe((valor) => {
      if (valor === true) {
        expect(valor).toBeTrue();
        done();
      }
    });
    service.mostrar();
  });

  it('debería emitir false al llamar a ocultar()', (done) => {
    service.mostrar();

    service.loading$.subscribe((valor) => {
      if (valor === false) {
        expect(valor).toBeFalse();
        done();
      }
    });

    service.ocultar();
  });
});
