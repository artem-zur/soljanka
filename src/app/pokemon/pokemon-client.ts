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

@Injectable({
  providedIn: 'root',
})
export class PokemonClient {
  private readonly http = inject(HttpClient);

  private readonly apiBaseUrl = 'https://pokeapi.co/api/v2';

  loadByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiBaseUrl}/pokemon/${name}`);
  }
}
