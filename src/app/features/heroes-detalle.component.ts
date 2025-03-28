import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgIf } from '@angular/common';
import { HeroeService } from '../core/services/heroe.service';
import { Heroe } from '../core/models/heroe.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-heroes-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, MatCardModule],
  templateUrl: './heroes-detalle.component.html',
  styleUrl: './heroes-detalle.component.scss',
})
export class HeroesDetalleComponent {
  private route = inject(ActivatedRoute);
  private heroeService = inject(HeroeService);
  heroe: Heroe | undefined;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroeService.buscarPorId(id).subscribe((data) => (this.heroe = data));
  }
}
