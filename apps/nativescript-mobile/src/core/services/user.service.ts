import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChangePasswordDto } from '@travel-planer/prisma-client';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  updatePassword(data: ChangePasswordDto) {
    return this.http
      .put(`${environment.API_URL}/users/update-password`, data)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
