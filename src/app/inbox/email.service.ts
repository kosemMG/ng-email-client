import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Email } from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'https://api.angular-email.com/emails/';

  constructor(private http: HttpClient) {
  }

  public fetchAll(): Observable<EmailSummary[]> {
    return this.http.get<EmailSummary[]>(this.emailUrl);
  }

  public fetchById(id: string): Observable<Email> {
    return this.http.get<Email>(this.emailUrl + id);
  }

  public sendEmail(email: Email): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(this.emailUrl, email);
  }
}
