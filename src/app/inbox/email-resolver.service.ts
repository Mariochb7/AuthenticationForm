import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<any> {
  constructor(private emailService: EmailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        return EMPTY; // empty is an observable , but we dont care what happens with it , like this case
      })
    );
  }
}
