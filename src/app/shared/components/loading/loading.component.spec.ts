import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LoadingService } from '../../services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loading$: BehaviorSubject<boolean>;

  beforeEach(async () => {
    loading$ = new BehaviorSubject<boolean>(false);

    await TestBed.configureTestingModule({
      imports: [
        LoadingComponent,
        CommonModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: LoadingService,
          useValue: {
            loading$: loading$.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el spinner cuando loading$ es true', fakeAsync(() => {
    loading$.next(true);
    fixture.detectChanges();
    tick(); // para que tome el nuevo valor
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-progress-spinner');
    expect(spinner).toBeTruthy();
  }));

  it('no debería mostrar el spinner cuando loading$ es false', fakeAsync(() => {
    loading$.next(false);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-progress-spinner');
    expect(spinner).toBeFalsy();
  }));
});
