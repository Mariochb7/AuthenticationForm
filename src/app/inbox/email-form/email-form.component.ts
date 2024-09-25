import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Email } from '../email';
import { SharedModule } from '../../shared/shared.module';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css',
})
export class EmailFormComponent {
  emailForm: FormGroup;
  @Input() email: Email;

  ngOnInit() {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }
}
