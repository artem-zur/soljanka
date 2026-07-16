import { Directive, ElementRef, inject, OnDestroy, OnInit, output } from '@angular/core';

@Directive({
  selector: '[appPokemonInfiniteScroll]',
  standalone: true,
})
export class PokemonInfiniteScrollDirective implements OnDestroy {
  readonly scrolled = output<void>();

  private readonly el = inject(ElementRef);

  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.scrolled.emit();
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
