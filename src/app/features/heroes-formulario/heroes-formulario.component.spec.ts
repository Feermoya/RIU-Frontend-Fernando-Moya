import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesFormularioComponent } from './heroes-formulario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroesFormularioComponent', () => {
  let component: HeroesFormularioComponent;
  let fixture: ComponentFixture<HeroesFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesFormularioComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el héroe si el formulario es válido', () => {
    spyOn(component.formGuardado, 'emit');

    component.heroeOriginal = {
      id: 99,
      nombre: 'Viejo',
      poder: 'Nada',
      activo: true,
    };
    component.form.setValue({
      nombre: 'Batman',
      poder: 'Inteligencia',
      activo: true,
    });

    component.guardar();

    expect(component.formGuardado.emit).toHaveBeenCalledWith({
      id: 99,
      nombre: 'Batman',
      poder: 'Inteligencia',
      activo: true,
    });
  });

  it('no debería emitir si el formulario es inválido', () => {
    spyOn(component.formGuardado, 'emit');

    component.form.setValue({ nombre: '', poder: '', activo: true });
    component.guardar();

    expect(component.formGuardado.emit).not.toHaveBeenCalled();
  });
});
