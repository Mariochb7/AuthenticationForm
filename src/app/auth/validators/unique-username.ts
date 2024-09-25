import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
        // console.log(err);
        if (err.error.username) {
          return of({
            nonUniqueUsername: true,
          }); //built in observable shortcut
        } else {
          return of({
            noConnection: true,
          }); //built in observable shortcut
        }
      })
    );
  };

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
