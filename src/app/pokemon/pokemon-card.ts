import { Component, computed, input, Signal } from '@angular/core';
import { PokemonSummary } from './pokemon-client';
import { PokemonAvatar } from './pokemon-avatar';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.html',
  imports: [PokemonAvatar, RouterLink],
})
export class PokemonCard {
  readonly pokemon = input.required<PokemonSummary>();

  readonly pokemonId: Signal<number | undefined> = computed(() => {
    const url = this.pokemon().url;
    const match = url.match(/\/pokemon\/(\d+)\//);

    return match ? Number(match[1]) : undefined;
  });
}
