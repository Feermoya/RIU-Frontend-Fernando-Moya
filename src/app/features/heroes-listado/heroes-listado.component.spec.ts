import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListadoComponent } from './heroes-listado.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

describe('HeroesListadoComponent', () => {
  let component: HeroesListadoComponent;
  let fixture: ComponentFixture<HeroesListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroesListadoComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería resetear la página cuando se cambia el filtro', fakeAsync(() => {
    component.paginaActual.set(3);
    component.filtro.set('batman');
    tick(); // efectos asincrónicos
    expect(component.paginaActual()).toBe(1);
  }));

  it('debería llamar a borrar si el usuario confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const borrarSpy = spyOn(
      component['heroeService'],
      'borrar',
    ).and.returnValue(of(true));
    component.borrar(99);

    expect(borrarSpy).toHaveBeenCalledWith(99);
  });

  it('no debería llamar a borrar si el usuario cancela', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const borrarSpy = spyOn(component['heroeService'], 'borrar').and.stub();
    component.borrar(99);
    expect(borrarSpy).not.toHaveBeenCalled();
  });

  it('debería cambiar de página si está en rango válido', () => {
    component.paginaActual.set(2);
    spyOn(component, 'totalPaginas').and.returnValue(5); // fuerza el total
    component.cambiarPagina(1);
    expect(component.paginaActual()).toBe(3);
  });

  it('no debería cambiar de página si el nuevo valor está fuera de rango', () => {
    component.paginaActual.set(1);
    spyOn(component, 'totalPaginas').and.returnValue(3);
    component.cambiarPagina(-1);
    expect(component.paginaActual()).toBe(1);
  });
});
