import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { Email } from '../email';
import { EmailSend } from '../email-form/email-form.component';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  public showModal = false;
  public email: Email;

  constructor(
    private auth: AuthService,
    private emailService: EmailService
  ) {
  }

  ngOnInit(): void {
    this.email = {
      id: '',
      from: `${this.auth.username}@angular-email.com`,
      to: '',
      subject: '',
      text: '',
      html: ''
    };
  }

  onSend(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => this.showModal = false);
  }
}
