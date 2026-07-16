import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { PokemonClient, PokemonList, PokemonSummary } from './pokemon-client';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonCard } from './pokemon-card';
import { Pokeball } from './pokeball';
import { PokemonInfiniteScrollDirective } from './pokemon-infinite-scroll';
import { delay, timeout } from 'rxjs';
import { PokemonStore } from './pokemon-store';

@Component({
  selector: 'app-pokemon-board',
  imports: [PokemonCard, NgOptimizedImage, Pokeball, PokemonInfiniteScrollDirective],
  templateUrl: './pokemon-board.html',
})
export class PokemonBoard {
  private readonly store = inject(PokemonStore);

  readonly pokemonList = this.store.pokemonList;
  readonly isLoading = this.store.isLoading;
  readonly hasMore = this.store.hasMore;

  loadNextBatch(): void {
    this.store.loadNextBatch();
  }
}
