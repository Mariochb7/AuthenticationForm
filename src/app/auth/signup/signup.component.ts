import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { InputComponent } from '../../shared/input/input.component';
import { AuthService, SignupCredentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate] //only runs when the synchronous validators are satisfied , this async will run
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );

  // using the regular .subscribe with next and error functions , and logging out this
  // will give access to only next and error functions inside the observable object
  // using arrow functions , will give access to the whole component ( Sign up component )
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService
      .signup(this.authForm.value as SignupCredentials)
      .subscribe({
        next: (response) => {
          //console.log(this);
          //Navigate to other route ( email inbox.. for example )
          this.router.navigateByUrl('/inbox');
        }, //everytime observable emits a value
        // complete() {}, //everytime its complete network request
        error: (err) => {
          // console.log(err);
          if (!err.status) {
            this.authForm.setErrors({
              noConnection: true,
            });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        }, //error thrown
      });
  }
}
