import { Injectable } from '@angular/core';
import { Heroe } from '../../core/models/heroe.model';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  private heroes: Heroe[] = [];
  private idCounter = 1;
  private cargado = false;

  constructor(private http: HttpClient) {}

  private simularRequest<T>(data: T): Observable<T> {
    return this.http.get('/assets/fake.json').pipe(
      delay(500),
      map(() => data),
    );
  }

  init(): Observable<void> {
    if (this.cargado) return of();
    return this.http.get<Heroe[]>('/assets/fake.json').pipe(
      map((data) => {
        this.heroes = data;
        this.idCounter =
          data.length > 0 ? Math.max(...data.map((h) => h.id)) + 1 : 1;
        this.cargado = true;
      }),
    );
  }

  obtenerTodos(): Observable<Heroe[]> {
    return this.simularRequest([...this.heroes]);
  }

  buscarPorId(id: number): Observable<Heroe | undefined> {
    const heroe = this.heroes.find((h) => h.id === id);
    return this.simularRequest(heroe);
  }

  buscarPorNombre(nombre: string): Observable<Heroe[]> {
    const filtro = nombre.toLowerCase();
    const resultado = this.heroes.filter((h) =>
      h.nombre.toLowerCase().includes(filtro),
    );
    return this.simularRequest(resultado);
  }

  agregar(heroe: Omit<Heroe, 'id'>): Observable<Heroe> {
    const nuevo = { ...heroe, id: this.idCounter++ };
    this.heroes.push(nuevo);
    return this.simularRequest(nuevo);
  }

  editar(heroe: Heroe): Observable<Heroe> {
    const index = this.heroes.findIndex((h) => h.id === heroe.id);
    if (index !== -1) this.heroes[index] = { ...heroe };
    return this.simularRequest(heroe);
  }

  borrar(id: number): Observable<boolean> {
    this.heroes = this.heroes.filter((h) => h.id !== id);
    return this.simularRequest(true);
  }
}
