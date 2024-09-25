import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, skipWhile, take, tap } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //console.log(`guard `, authService);
  return authService.signedin$.pipe(
    // Skip until we have a non-null value
    skipWhile((value) => value === null),
    // Take only the first valid (non-null) value
    take(1),
    tap((authenticated) => {
      if (!authenticated) {
        router.navigateByUrl('/');
      }
    }),
    // Ensure the emitted value is either true or false
    map((signedIn) => {
      if (!signedIn) {
        return false; // Prevent access if not signed in
      }
      return true; // Allow access if signed in
    })
  );
};
