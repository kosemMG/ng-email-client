import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public signedIn = false;

  constructor(private auth: AuthService) {
  }

  public ngOnInit(): void {
    this.auth.checkAuth().subscribe();
    this.auth.signedIn$.subscribe(signedIn => this.signedIn = signedIn);
  }
}
