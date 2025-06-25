import { CreateUserDto, LoginDto } from '@travel-planer/prisma-client';
import { User } from '@prisma/client';
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationSettings } from '@nativescript/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { RouterExtensions } from '@nativescript/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = signal<boolean>(false);
  private _user = signal<Partial<User> | null>(null);
  private _token = signal<string | null>(null);
  private router = inject(RouterExtensions);
  private http = inject(HttpClient);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();

  readonly isLoggedIn = computed(() => {
    return this._isAuthenticated() && !!this._token();
  });

  constructor() {
    this.initializeAuth();
  }

  register(credentials: CreateUserDto) {
    return this.http
      .post(`${environment.API_URL}/users`, credentials)
      .pipe(catchError((error) => throwError(() => error)));
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
    this.http.post(`${environment.API_URL}/auth/logout`, {}).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.clearAuthData();
      },
    });
  }

  private setAuthData(token: string): void {
    this.storeToken(token);
    this._token.set(token);
    this._isAuthenticated.set(true);
    this.loadUserProfile();
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
      .get(`${environment.API_URL}/users/me`)
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

      this.loadUserProfile();
    }
  }
}
