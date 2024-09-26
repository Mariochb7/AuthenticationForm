import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Email } from '../email';
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
  @Output() emailSubmit = new EventEmitter();

  ngOnInit() {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) return;
    //  console.log(this.emailForm.value); // here from will be removed because it is disabled,
    //if we wanted to include from , we should use this.emailForm.getRawValue()
    //console.log(this.emailForm.getRawValue());

    this.emailSubmit.emit(this.emailForm.value); // the form will capture this emitted object and pass it to the service
  }
}
