import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { User, UserQuery } from 'src/generated/graphql';
import { AUTH_CONFIG } from '../config/auth.config';
import { USER_QUERY } from '../graphql/queries/user';
import { ApiService } from './api.service';
import { LoginLoading } from './loginLoading';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends LoginLoading {
  private readonly TOKEN_KEY = AUTH_CONFIG.TOKEN_KEY;

  http = inject(HttpClient);
  router = inject(Router);
  apiService = inject(ApiService);

  constructor() {
    super();
    if (this.getToken() && !this.isTokenExpired(this.getToken()!)) {
      this.loggedIn.set(true);
      this.getUser();
      this.triggerLoading();
    }
    this.allComponentsReady.subscribe((value) => {
      console.log('this.allComponentsReady', value);
    });
  }

  getUser() {
    this.apiService.query<UserQuery>({ query: USER_QUERY }).valueChanges.subscribe((result) => {
      console.log('getUser()', result);
      if (result.data.user) this.user = result.data.user;
    });
  }

  logout(): void {
    this.removeToken();
    this.componentStates.clear();
    this.loggedIn.set(false);
    this.apiService.deleteCache();
    this.router.navigate(['/auth']);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  login(user: User): void {
    this.user = user;
    this.isLoading.set(true);
    this.loggedIn.set(true);
    this.triggerLoading();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  refreshToken(): Observable<any> {
    return this.http.post('/auth/refresh-token', {});
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }

  private setupTokenRenewal(): void {
    const token = this.getToken();
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const renewalTime = expirationTime - 20 * 60 * 1000; // 5 minutes before expiry

      if (renewalTime > currentTime) {
        setTimeout(() => {
          this.refreshToken().subscribe({
            next: (response: any) => {
              this.setToken(response.token);
              this.setupTokenRenewal(); // Setup next renewal
            },
            error: () => {
              this.logout();
              this.router.navigate(['/auth']);
            },
          });
        }, renewalTime - currentTime);
      }
    } catch {
      // Invalid token, logout
      this.logout();
    }
  }
}
