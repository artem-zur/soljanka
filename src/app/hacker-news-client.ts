import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type HackerJobStories = number[];

export interface HackerJob {
  by?: string;
  id?: number;
  score?: number;
  time?: number;
  title?: string;
  type?: string;
  url?: string;
}

@Injectable({ providedIn: 'root' })
export class HackerNewsClient {
  private readonly http = inject(HttpClient);

  private readonly apiBaseUrl = 'https://hacker-news.firebaseio.com/v0';

  loadJobStories(): Observable<HackerJobStories> {
    return this.http.get<HackerJobStories>(`${this.apiBaseUrl}/jobstories.json`);
  }

  loadJob(jobId: number): Observable<HackerJob> {
    return this.http.get<HackerJob>(`${this.apiBaseUrl}/item/${jobId}.json`);
  }
}
