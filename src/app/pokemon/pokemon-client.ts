import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean; // TODO: We can normalize REST API fields in order to follow the same naming pattern
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
}

export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonList {
  next?: string;
  results: PokemonSummary[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonClient {
  private readonly http = inject(HttpClient);

  private readonly API_BASE_URL = 'https://pokeapi.co/api/v2';

  load(offset: number, limit: number): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.API_BASE_URL}/pokemon`, {
      params: { offset, limit },
    });
  }

  loadBy(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_BASE_URL}/pokemon/${nameOrId}`);
  }
}
