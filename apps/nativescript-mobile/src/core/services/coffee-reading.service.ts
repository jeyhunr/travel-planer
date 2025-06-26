import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { RouterExtensions } from '@nativescript/angular';

export interface Post {
  uid: string;
  overallInterpretation: string;
  user: string;
  imageUrl: string;
  createdAt: string;
}

type Symbols = {
  shape: string;
  position: string;
  description: string;
  meaning: string;
};

export interface PostDetails extends Post {
  symbols: Symbols[];
}

@Injectable({
  providedIn: 'root',
})
export class CoffeeReadingService {
  private http = inject(HttpClient);
  private router = inject(RouterExtensions);
  private take = 5;
  private skip = 0;

  posts = signal<Post[]>([]);
  loading = signal<boolean>(false);
  loadingMore = signal<boolean>(false);

  currentPost = signal<PostDetails | null>(null);
  loadingDetail = signal<boolean>(false);

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

  getPostDetails(uid: string): void {
    this.loadingDetail.set(true);
    this.currentPost.set(null);

    this.http.get<PostDetails>(`${environment.API_URL}/coffee-readings/details/${uid}`).subscribe({
      next: (post) => {
        this.currentPost.set({
          ...post,
          imageUrl: `${environment.FILE_URL}${post.imageUrl}`,
          createdAt: new Date(post.createdAt).toDateString(),
        });
        this.loadingDetail.set(false);
      },
      error: (e) => {
        console.log(e);
        this.loadingDetail.set(false);
      },
    });
  }

  sharePost(uid: string): void {
    this.http.put(`${environment.API_URL}/coffee-readings/share/${uid}`, {}).subscribe({
      next: () => {
        this.router.navigate(['/home'], {
          transition: {
            name: 'fade',
            duration: 200,
          },
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
