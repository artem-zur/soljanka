import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PokemonClient } from './pokemon-client';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonCard } from './pokemon-card';
import { Pokeball } from './pokeball';

@Component({
  selector: 'app-pokemon-board',
  imports: [PokemonCard, NgOptimizedImage, Pokeball],
  templateUrl: './pokemon-board.html',
})
export class PokemonBoard {
  private readonly pokemonClient = inject(PokemonClient);

  readonly pokemonListResource = rxResource({
    stream: () => this.pokemonClient.load(),
  });
}
