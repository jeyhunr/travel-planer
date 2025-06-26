import { inject, Injectable, signal } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { environment } from '../../environments/environment';
import * as bgHttp from '@nativescript/background-http';
import { ApplicationSettings } from '@nativescript/core';
import { File } from '@nativescript/core';

@Injectable({
  providedIn: 'root',
})
export class FalService {
  private router = inject(RouterExtensions);

  loading = signal(false);
  createFal(filePath: string, language: string) {
    this.loading.set(true);
    const token = ApplicationSettings.getString(environment.TOKEN_KEY, null);

    const session = bgHttp.session('image-upload');
    const request: bgHttp.Request = {
      url: `${environment.API_URL}/openai/check/`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      description: 'Uploading photo...',
    };

    const params = [
      {
        name: 'language',
        value: language,
      },
      {
        name: 'image',
        filename: filePath,
        mimeType: 'image/jpeg',
      },
    ];

    const task = session.multipartUpload(params, request);

    task.on('progress', (e) => {
      console.log(`Upload: ${e.currentBytes} / ${e.totalBytes}`);
    });

    task.on('error', (e) => {
      this.loading.set(false);
    });

    task.on('complete', (e: any) => {
      // const data = e.data;

      this.router.navigate(['/home']);
      this.loading.set(false);
    });
  }
}
