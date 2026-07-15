import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pokeball',
  template: `<img ngSrc="pokeball.png" width="32" height="32" class="mx-auto animate-spin" />`,
  imports: [NgOptimizedImage],
})
export class Pokeball {}
