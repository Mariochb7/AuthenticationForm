import { Component } from '@angular/core';
import { EmailService } from '../email.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './email-index.component.html',
  styleUrl: './email-index.component.css',
})
export class EmailIndexComponent {
  emails: any[] = [];
  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }
}
