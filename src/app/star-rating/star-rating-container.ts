import { Component, signal } from '@angular/core';
import { StarRating } from './star-rating';

@Component({
  selector: 'app-star-rating-container',
  imports: [StarRating],
  templateUrl: './star-rating-container.html',
})
export class StarRatingContainer {
  protected latestSelected = signal<number | undefined>(undefined);

  protected logRating(value: number) {
    this.latestSelected.set(value);
  }
}
