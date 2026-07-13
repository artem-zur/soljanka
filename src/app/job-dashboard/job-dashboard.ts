import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { JobStories, JobClient } from './job-client';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobCard } from './job-card';

@Component({
  selector: 'app-job-dashboard',
  imports: [JobCard],
  templateUrl: './job-dashboard.html',
})
export class JobDashboard implements OnInit {
  private readonly hackerNewsClient = inject(JobClient);
  private readonly destroyRef = inject(DestroyRef);

  private readonly jobStories = signal<JobStories>([]);

  private readonly jobStoriesToDisplayChunkSize = 6;
  private readonly jobStoriesToDisplayAmount = signal<number>(this.jobStoriesToDisplayChunkSize);

  public readonly jobStoriesToDisplay = computed<JobStories>(() => {
    const stories = this.jobStories();

    // It might be that we have nothing to display yet
    if (stories.length === 0) return [];

    const maxIndex = stories.length;
    let targetIndex = this.jobStoriesToDisplayAmount();

    if (targetIndex >= maxIndex) {
      targetIndex = maxIndex;
    }

    return stories.slice(0, targetIndex);
  });

  public readonly isDisplayLoadMore = computed<boolean>(
    () => this.jobStoriesToDisplayAmount() < this.jobStories().length,
  );

  ngOnInit(): void {
    // TODO: Can we do it better?
    this.hackerNewsClient
      .loadJobStories()
      .pipe(
        // To prevent holding subscription after leaving the component in the middle of the Request
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (stories) => this.jobStories.set(stories),
        error: (err) => console.error('Unable to get Hacker News Job Stories', err),
      });
  }

  loadMore(): void {
    this.jobStoriesToDisplayAmount.update((current) => current + this.jobStoriesToDisplayChunkSize);
  }
}
