import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { HeroesListadoComponent } from './app/features/heroes-listado/heroes-listado.component';
import { HeroesDetalleComponent } from './app/features/heroes-detalle.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter([
      { path: '', component: HeroesListadoComponent },
      { path: 'detalle/:id', component: HeroesDetalleComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
});
