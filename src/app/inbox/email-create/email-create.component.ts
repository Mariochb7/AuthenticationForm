import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { EmailFormComponent } from '../email-form/email-form.component';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-email-create',
  standalone: true,
  imports: [CommonModule, ModalComponent, EmailFormComponent],
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css',
})
export class EmailCreateComponent {
  showModal = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.authService.username}@anuglar-email.com`,
    };
  }

  onSubmit(email: Email) {
    //Send the email via email service
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
