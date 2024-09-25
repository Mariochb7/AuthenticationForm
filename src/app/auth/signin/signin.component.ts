import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InputComponent } from '../../shared/input/input.component';
import { AuthService, SigninCredentials } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, InputComponent, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(private authService: AuthService, private router: Router) {}

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  //LordMa Mario19867
  onSubmit() {
    if (this.authForm.invalid) return;
    this.authService
      .signin(this.authForm.value as SigninCredentials)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/inbox');
        },
        error: ({ error }) => {
          if (error.username || error.password) {
            this.authForm.setErrors({ credentials: true });
          }
        },
      });
  }
}
