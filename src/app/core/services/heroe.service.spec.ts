import { TestBed } from '@angular/core/testing';
import { HeroeService } from './heroe.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FakeBackendService } from './fake-backend.service';
import { of } from 'rxjs';

function flushAllFakeJsonRequests(httpMock: HttpTestingController) {
  let reqs = httpMock.match('/assets/fake.json');
  while (reqs.length) {
    reqs.forEach((req) => req.flush([]));
    reqs = httpMock.match('/assets/fake.json');
  }
}

describe('HeroeService', () => {
  let service: HeroeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // para evitar que dispare la request extra
    const backend = TestBed.inject(FakeBackendService);
    spyOn(backend, 'init').and.returnValue(of(void 0));

    service = TestBed.inject(HeroeService);
    httpMock = TestBed.inject(HttpTestingController);

    //carga inicial manual
    const initReq = httpMock.expectOne('/assets/fake.json');
    initReq.flush([]);

    // Evito que dispare requests innecesarios al testear agregar/editar/borrar
    spyOn(service as any, 'actualizarLista').and.callFake(() => {});
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería agregar un héroe', (done) => {
    service
      .agregar({ nombre: 'Spiderman', poder: 'Agilidad', activo: true })
      .subscribe((nuevo) => {
        expect(nuevo).toBeTruthy();
        expect(nuevo.nombre).toBe('Spiderman');
        done();
      });

    const req = httpMock.expectOne('/assets/fake.json');
    req.flush({ id: 1, nombre: 'Spiderman', poder: 'Agilidad', activo: true });
  });

  it('debería editar un héroe', (done) => {
    service
      .agregar({ nombre: 'Ironman', poder: 'Tecnología', activo: true })
      .subscribe((original) => {
        const actualizado = { ...original, nombre: 'Ironman V2' };

        service.editar(actualizado).subscribe((editado) => {
          expect(editado.nombre).toBe('Ironman V2');
          done();
        });

        const editReq = httpMock.expectOne('/assets/fake.json');
        editReq.flush(actualizado);
      });

    const addReq = httpMock.expectOne('/assets/fake.json');
    addReq.flush({
      id: 1,
      nombre: 'Ironman',
      poder: 'Tecnología',
      activo: true,
    });
  });

  it('debería borrar un héroe', (done) => {
    service
      .agregar({ nombre: 'Thor', poder: 'Trueno', activo: true })
      .subscribe((heroe) => {
        service.borrar(heroe.id).subscribe((resultado) => {
          expect(resultado).toBeTrue();
          done();
        });

        const deleteReq = httpMock.expectOne('/assets/fake.json');
        deleteReq.flush(true);
      });

    const addReq = httpMock.expectOne('/assets/fake.json');
    addReq.flush({ id: 1, nombre: 'Thor', poder: 'Trueno', activo: true });
  });

  it('debería buscar héroe por ID', (done) => {
    service
      .agregar({ nombre: 'Flash', poder: 'Velocidad', activo: true })
      .subscribe((heroe) => {
        flushAllFakeJsonRequests(httpMock);

        service.buscarPorId(heroe.id).subscribe((resultado) => {
          expect(resultado?.nombre).toBe('Flash');
          done();
        });

        flushAllFakeJsonRequests(httpMock);
      });

    flushAllFakeJsonRequests(httpMock);
  });

  it('debería buscar héroe por nombre parcial', (done) => {
    service
      .agregar({ nombre: 'Batman', poder: 'Inteligencia', activo: true })
      .subscribe(() => {
        flushAllFakeJsonRequests(httpMock);

        service
          .agregar({ nombre: 'Aquaman', poder: 'Agua', activo: true })
          .subscribe(() => {
            flushAllFakeJsonRequests(httpMock);

            service.buscarPorNombre('man').subscribe((resultado) => {
              expect(resultado.length).toBeGreaterThanOrEqual(2);
              expect(resultado.map((h) => h.nombre)).toEqual(
                jasmine.arrayContaining(['Batman', 'Aquaman']),
              );
              done();
            });

            flushAllFakeJsonRequests(httpMock);
          });

        flushAllFakeJsonRequests(httpMock);
      });

    flushAllFakeJsonRequests(httpMock);
  });
});
