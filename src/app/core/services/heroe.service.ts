import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Heroe } from '../models/heroe.model';
import { FakeBackendService } from './fake-backend.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private heroesSubject = new BehaviorSubject<Heroe[]>([]);

  constructor(private backend: FakeBackendService) {
    this.backend.init().subscribe(() => {
      this.actualizarLista();
    });
  }

  obtenerTodos(): Observable<Heroe[]> {
    return this.heroesSubject.asObservable();
  }

  actualizarLista(): void {
    this.backend.obtenerTodos().subscribe((lista) => {
      this.heroesSubject.next(lista);
    });
  }
  buscarPorId(id: number): Observable<Heroe | undefined> {
    return this.backend.buscarPorId(id);
  }

  buscarPorNombre(nombre: string): Observable<Heroe[]> {
    return this.backend.buscarPorNombre(nombre);
  }

  agregar(heroe: Omit<Heroe, 'id'>): Observable<Heroe> {
    return this.backend.agregar(heroe).pipe(tap(() => this.actualizarLista()));
  }

  editar(heroe: Heroe): Observable<Heroe> {
    return this.backend.editar(heroe).pipe(tap(() => this.actualizarLista()));
  }

  borrar(id: number): Observable<boolean> {
    return this.backend.borrar(id).pipe(tap(() => this.actualizarLista()));
  }
}
