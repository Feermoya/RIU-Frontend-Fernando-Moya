import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Heroe } from '../../core/models/heroe.model';
import { MayusculasDirective } from '../../shared/directives/mayusculas.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-heroes-formulario',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MayusculasDirective,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './heroes-formulario.component.html',
})
export class HeroesFormularioComponent {
  private fb = inject(FormBuilder);

  @Input() heroeOriginal: Heroe | null = null;
  @Output() formGuardado = new EventEmitter<Heroe>();

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    poder: ['', Validators.required],
    activo: [true],
  });

  ngOnInit(): void {
    if (this.heroeOriginal) {
      this.form.patchValue(this.heroeOriginal);
    }
  }

  guardar(): void {
    if (this.form.valid) {
      const heroe = {
        ...this.heroeOriginal,
        ...this.form.value,
      } as Heroe;

      this.formGuardado.emit(heroe);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
