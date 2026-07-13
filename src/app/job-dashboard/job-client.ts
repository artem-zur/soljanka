import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type JobStories = number[];

export interface Job {
  by?: string;
  id?: number;
  score?: number;
  time?: number;
  title?: string;
  type?: string;
  url?: string;
}

@Injectable({ providedIn: 'root' })
export class JobClient {
  private readonly http = inject(HttpClient);

  private readonly apiBaseUrl = 'https://hacker-news.firebaseio.com/v0';

  loadJobStories(): Observable<JobStories> {
    return this.http.get<JobStories>(`${this.apiBaseUrl}/jobstories.json`);
  }

  loadJob(jobId: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiBaseUrl}/item/${jobId}.json`);
  }
}
