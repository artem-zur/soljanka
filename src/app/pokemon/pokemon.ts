import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonClient } from './pokemon-client';
import { NgOptimizedImage } from '@angular/common';
import { PokemonAvatar } from './pokemon-avatar';
import { Pokeball } from './pokeball';

@Component({
  selector: 'app-pokemon',
  imports: [PokemonAvatar, Pokeball],
  styleUrls: ['./pokemon.scss'],
  templateUrl: './pokemon.html',
})
export class Pokemon {
  nameOrId = input.required<string>();

  private readonly pokemonClient = inject(PokemonClient);

  // TODO: Cache loaded Pokemon because it rarely changes
  readonly pokemonResource = rxResource({
    params: () => ({ identifier: this.nameOrId() }),
    stream: ({ params }) => this.pokemonClient.loadBy(params.identifier),
  });
}
