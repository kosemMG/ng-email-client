import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
  @Input() email: Email;
  public showModal = false;

  constructor(private emailService: EmailService) {
  }

  ngOnChanges(): void {
    const {to, from, subject, text } = this.email;
    this.email = {
      ...this.email,
      from: to,
      to: from,
      subject: `RE: ${subject}`,
      text: `\n\n\n--------------${from} wrote:--------------\n> ${text.replace(/\n/gi, '\n> ')}`
    };
  }

  onSend(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => this.showModal = false);
  }
}
