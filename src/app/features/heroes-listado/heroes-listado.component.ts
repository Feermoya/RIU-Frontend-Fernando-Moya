import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroeService } from '../../core/services/heroe.service';
import { Heroe } from '../../core/models/heroe.model';
import { HeroesFormularioComponent } from '../heroes-formulario/heroes-formulario.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-heroes-listado',
  imports: [
    CommonModule,
    FormsModule,
    HeroesFormularioComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './heroes-listado.component.html',
  styleUrl: './heroes-listado.component.scss',
})
export class HeroesListadoComponent {
  private heroeService = inject(HeroeService);
  filtro = signal('');
  heroes = signal<Heroe[]>([]);
  paginaActual = signal(1);
  tamanioPagina = 5;
  formularioVisible = signal(false);
  heroeEnEdicion = signal<Heroe | null>(null);

  heroesFiltrados = computed(() => {
    const filtroNombre = this.filtro().toLowerCase();
    return this.heroes().filter((h) =>
      h.nombre.toLowerCase().includes(filtroNombre),
    );
  });

  heroesPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.tamanioPagina;
    const fin = inicio + this.tamanioPagina;
    return this.heroesFiltrados().slice(inicio, fin);
  });

  totalPaginas = computed(() =>
    Math.ceil(this.heroesFiltrados().length / this.tamanioPagina),
  );

  constructor() {
    this.heroeService.obtenerTodos().subscribe((lista) => {
      this.heroes.set(lista);
    });

    // reset página si cambia el filtro
    effect(
      () => {
        this.filtro();
        this.paginaActual.set(1);
      },
      { allowSignalWrites: true },
    );
  }

  borrar(id: number): void {
    if (confirm('¿Estás seguro de borrar este héroe?')) {
      this.heroeService.borrar(id).subscribe(() => {
        this.actualizarHeroes();
      });
    }
  }

  cambiarPagina(direccion: number): void {
    const nueva = this.paginaActual() + direccion;
    if (nueva >= 1 && nueva <= this.totalPaginas()) {
      this.paginaActual.set(nueva);
    }
  }
  mostrarFormularioParaNuevo(): void {
    this.heroeEnEdicion.set(null);
    this.formularioVisible.set(true);
  }

  mostrarFormularioParaEditar(heroe: Heroe): void {
    this.heroeEnEdicion.set(heroe);
    this.formularioVisible.set(true);
  }

  ocultarFormulario(): void {
    this.formularioVisible.set(false);
  }

  guardarHeroe(heroe: Heroe): void {
    const request$ = heroe.id
      ? this.heroeService.editar(heroe)
      : this.heroeService.agregar({
          nombre: heroe.nombre,
          poder: heroe.poder,
          activo: heroe.activo,
        });

    request$.subscribe(() => {
      this.actualizarHeroes();
      this.ocultarFormulario();
    });
  }

  actualizarHeroes(): void {
    this.heroeService.obtenerTodos().subscribe((lista) => {
      this.heroes.set(lista);
    });
  }
}
