import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  public email: Email;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.data.email;
    this.route.data.subscribe(({ email }) => this.email = email);

    // this.route.params.pipe(
    //   switchMap(({ id }) => this.emailService.fetchById(id))
    // ).subscribe((email: Email) => this.email = email);
  }

}
