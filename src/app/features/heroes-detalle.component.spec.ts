import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesDetalleComponent } from './heroes-detalle.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HeroeService } from '../core/services/heroe.service';

describe('HeroesDetalleComponent', () => {
  let component: HeroesDetalleComponent;
  let fixture: ComponentFixture<HeroesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesDetalleComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        {
          provide: HeroeService,
          useValue: {
            buscarPorId: () =>
              of({
                id: 1,
                nombre: 'Superman',
                poder: 'Fuerza sobrehumana',
                activo: true,
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
