import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonClient } from './pokemon-client';
import { NgOptimizedImage } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  imports: [NgOptimizedImage],
  styleUrls: ['./pokemon.scss'],
  templateUrl: './pokemon.html',
})
export class Pokemon {
  nameOrId = input.required<string>();

  private readonly pokemonClient = inject(PokemonClient);

  // TODO: Cache loaded Pokemon because it rarely changes
  public readonly pokemonResource = rxResource({
    params: () => ({ identifier: this.nameOrId() }),
    stream: ({ params }) => this.pokemonClient.loadBy(params.identifier),
  });
}
