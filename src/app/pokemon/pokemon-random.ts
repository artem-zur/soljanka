import { Component, OnInit, signal } from '@angular/core';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-pokemon-random',
  imports: [Pokemon],
  templateUrl: './pokemon-random.html',
})
export class PokemonRandom implements OnInit {
  // Current supported species limit in the PokéApi database
  private readonly POKEMON_SPECIES_COUNT = 1025;

  readonly pokemonId = signal<number>(1);

  ngOnInit(): void {
    this.generateRandmonPokemonId();
  }

  private generateRandmonPokemonId(): void {
    const id = Math.floor(Math.random() * this.POKEMON_SPECIES_COUNT) + 1;

    this.pokemonId.set(id);
  }
}
