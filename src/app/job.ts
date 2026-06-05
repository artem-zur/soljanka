import { Component, DestroyRef, effect, inject, input, resource, signal } from '@angular/core';
import { HackerJob, HackerNewsClient } from './hacker-news-client';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job',
  imports: [DatePipe],
  templateUrl: './job.html',
})
export class Job {
  id = input.required<number>();
  details = signal<HackerJob | null>(null);

  private readonly hackerNewsClient = inject(HackerNewsClient);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.hackerNewsClient
        .loadJob(this.id())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (value) => this.details.set(value),
          error: (err) => console.error('Unable to load Job Details', err),
        });
    });
  }
}
