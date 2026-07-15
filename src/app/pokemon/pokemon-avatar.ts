import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-pokemon-avatar',
  templateUrl: './pokemon-avatar.html',
  imports: [NgOptimizedImage],
})
export class PokemonAvatar {
  pokemonId = input.required<number>();
  width = input.required<number>();
  height = input.required<number>();
}
