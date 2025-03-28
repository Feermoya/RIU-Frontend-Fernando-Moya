import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  mostrar(): void {
    this.loadingSubject.next(true);
  }

  ocultar(): void {
    this.loadingSubject.next(false);
  }
}
