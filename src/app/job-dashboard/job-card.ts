import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { Job, JobClient } from './job-client';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-card',
  imports: [DatePipe],
  templateUrl: './job-card.html',
})
export class JobCard {
  id = input.required<number>();
  details = signal<Job | null>(null);

  private readonly jobClient = inject(JobClient);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.jobClient
        .loadJob(this.id())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (value) => this.details.set(value),
          error: (err) => console.error('Unable to load Job Details', err),
        });
    });
  }
}
