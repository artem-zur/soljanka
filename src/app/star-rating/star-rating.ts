import { Component, computed, input, OnInit, output, signal, Signal } from '@angular/core';

interface Star {
  id: number;
  selected: boolean;
}

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.html',
})
export class StarRating implements OnInit {
  /** Maximum Raiting value, where 5 is by default when not provided. */
  readonly max = input<number>(5);

  /** Initial Raiting value, where 0 is by default when not provided. */
  readonly initial = input<number>(0);

  /** Rating changed to the following number. */
  changed = output<number>();

  readonly stars: Signal<Star[]> = computed(() => {
    return Array.from({ length: this.max() }, (_item, index) => ({
      id: index + 1,
      selected: index < (this.hovered() || this.selected()),
    }));
  });

  readonly hovered = signal<number>(0);

  readonly selected = signal<number>(0);

  ngOnInit() {
    this.selected.set(this.initial());
  }

  protected hover(id: number) {
    this.hovered.set(id);
  }

  protected blur() {
    this.hovered.set(0);
  }

  protected select(id: number) {
    this.selected.set(id);
    this.changed.emit(id);
  }
}
