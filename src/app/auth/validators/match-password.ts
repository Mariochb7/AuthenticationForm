import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) //we can use this class now with dependency injection system
export class MatchPassword implements Validator {
  //abstract control can be either form group or form control
  validate(control: AbstractControl): ValidationErrors | null {
    const { password, passwordConfirmation } = control.value;
    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordDontMatch: true }; //assigned to the error property of the form group or control
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
