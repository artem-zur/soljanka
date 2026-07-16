import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { PokemonClient, PokemonList, PokemonSummary } from './pokemon-client';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonCard } from './pokemon-card';
import { Pokeball } from './pokeball';
import { PokemonInfiniteScrollDirective } from './pokemon-infinite-scroll';
import { delay, timeout } from 'rxjs';

@Component({
  selector: 'app-pokemon-board',
  imports: [PokemonCard, NgOptimizedImage, Pokeball, PokemonInfiniteScrollDirective],
  templateUrl: './pokemon-board.html',
})
export class PokemonBoard {
  private readonly pokemonClient = inject(PokemonClient);

  private readonly listOffset = signal<number>(0);
  private readonly LIST_LIMIT = 50;

  private readonly pokemonListResource = rxResource({
    params: () => ({ offset: this.listOffset(), limit: this.LIST_LIMIT }),
    stream: ({ params }) => this.pokemonClient.load(params.offset, params.limit).pipe(delay(1000)),
    defaultValue: { results: [] },
  });

  readonly pokemonList = linkedSignal<PokemonList, PokemonSummary[]>({
    source: () => this.pokemonListResource.value(),
    computation: (source, previous) => {
      return [...(previous?.value ?? []), ...source.results];
    },
  });

  readonly isLoading = this.pokemonListResource.isLoading;

  readonly hasMore = computed<boolean>(() => {
    return this.pokemonListResource.value().next ? true : false;
  });

  loadNextBatch(): void {
    if (this.isLoading() || !this.hasMore()) return;

    this.listOffset.update((current) => current + this.LIST_LIMIT);
  }
}
