import { Component, OnInit } from '@angular/core';

import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  public emails = [];

  constructor(private email: EmailService) { }

  public ngOnInit(): void {
    this.email.fetchAll().subscribe(emails => this.emails = emails);
    console.log(this.emails);
  }

}
