import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

export interface EmailSend {
  to: string;
  subject?: string;
  text: string;
}

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Input() email: Email;
  @Output() emailSend = new EventEmitter<Email>();
  public emailForm: FormGroup;

  constructor() {
  }

  public ngOnInit(): void {
    const { from, to, subject, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject),
      text: new FormControl(text, Validators.required)
    });
  }

  public onSend() {
    if (this.emailForm.valid) {
      this.emailSend.emit(this.emailForm.value);
    }
  }
}
