import { Component, Input } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from '../email-form/email-form.component';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  standalone: true,
  imports: [ModalComponent, CommonModule, EmailFormComponent],
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.css',
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email: Email;

  constructor(private emailService: EmailService) {}

  ngOnChanges() {
    const text = this.email.text.replace(/\n/gi, '\n> ');
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n-------- ${this.email.from} wrote: \n>${text}`,
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
