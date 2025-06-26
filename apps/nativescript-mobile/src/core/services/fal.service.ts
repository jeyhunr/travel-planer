import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FalService {
  private http = inject(HttpClient);
  private router = inject(RouterExtensions);

  loading = signal<boolean>(false);

  createFal(imageSrc: string, language: string) {
    this.loading.set(true);

    this.http.post<{ uid: string }>(`${environment.API_URL}/openai/check/`, { image: imageSrc, language }).subscribe({
      next: (response) => {
        this.router.navigate(['/feed-detail', response.uid]);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        console.error(error);
      },
    });
  }
}
