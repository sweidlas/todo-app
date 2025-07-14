import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  console.log('AuthGuard token', token);
  if (!token || authService.isTokenExpired(token)) {
    console.log('authService.isTokenExpired(token)');
    authService.logout();
    return false;
  }

  return true;
};
