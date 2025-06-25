import { LoginDto } from '@travel-planer/prisma-client';
import { User } from '@prisma/client';
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationSettings } from '@nativescript/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = signal<boolean>(false);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();

  readonly isLoggedIn = computed(() => {
    return this._isAuthenticated() && !!this._token();
  });

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  login(credentials: LoginDto): Observable<{ access_token: string }> {
    return this.http.post(`${environment.API_URL}/auth/login`, credentials).pipe(
      tap((response: { access_token: string }) => {
        this.setAuthData(response.access_token);
      }),
      catchError((error) => throwError(() => error))
    );
  }

  logout(): void {
    this.clearAuthData();

    this.http.post(`${environment.API_URL}/auth/logout`, {}).subscribe();
  }

  private setAuthData(token: string): void {
    this.storeToken(token);
    this._token.set(token);
    this._isAuthenticated.set(true);
    // this.loadUserProfile();
  }

  private clearAuthData(): void {
    this.removeStoredToken();
    this._token.set(null);
    this._isAuthenticated.set(false);
    this._user.set(null);
  }

  private loadUserProfile(): void {
    if (!this._token()) return;

    this.http
      .get<User>(`${environment.API_URL}/user/profile`)
      .pipe(
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      )
      .subscribe((user) => {
        this._user.set(user);
      });
  }

  private getStoredToken(): string | null {
    return ApplicationSettings.getString(environment.TOKEN_KEY, null);
  }

  private storeToken(token: string): void {
    ApplicationSettings.setString(environment.TOKEN_KEY, token);
  }

  private removeStoredToken(): void {
    ApplicationSettings.remove(environment.TOKEN_KEY);
  }

  private initializeAuth(): void {
    const token = this.getStoredToken();
    if (token) {
      this._token.set(token);
      this._isAuthenticated.set(true);

      //   this.loadUserProfile();
    }
  }
}
