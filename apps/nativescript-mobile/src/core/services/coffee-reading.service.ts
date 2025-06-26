import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Post {
  uid: string;
  overallInterpretation: string;
  user: string;
  imageUrl: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoffeeReadingService {
  private http = inject(HttpClient);

  posts = signal<Post[]>([]);
  loading = signal<boolean>(false);
  loadingMore = signal<boolean>(false);

  private take = 5;
  private skip = 0;

  loadPosts(): void {
    this.loading.set(true);
    this.skip = 0;

    this.http.get<Post[]>(`${environment.API_URL}/coffee-readings/all/${this.skip}/${this.take}`).subscribe({
      next: (newPosts) => {
        this.posts.set(
          newPosts.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt).toDateString(),
            imageUrl: `${environment.FILE_URL}${post.imageUrl}`,
          }))
        );
        this.loading.set(false);
        this.skip += this.take;
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  loadMorePosts(): void {
    this.loadingMore.set(true);

    this.http.get<Post[]>(`${environment.API_URL}/coffee-readings/all/${this.skip}/${this.take}`).subscribe({
      next: (newPosts) => {
        this.posts.update((currentPosts) => [...currentPosts, ...newPosts]);
        this.loadingMore.set(false);
        this.skip += this.take;
      },
      error: () => {
        this.loadingMore.set(false);
      },
    });
  }
}
