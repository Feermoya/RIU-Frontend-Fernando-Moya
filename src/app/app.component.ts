import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, LoadingComponent],
  template: `
    <div class="banner-container">
      <img class="banner-image" src="assets/superheroes-banner.jpeg" alt="Banner" />
      <div class="banner-overlay">
        <h1>Mantenimiento de Superhéroes</h1>
      </div>
    </div>

    <app-loading></app-loading>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
