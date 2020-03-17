import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [
      this.uniqueUsername.validate
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      // Validators.required,
      // Validators.minLength(4),
      // Validators.maxLength(20)
    ])
  }, { validators: [this.matchPassword.validate] });

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.auth.signup(this.authForm.value)
      .subscribe({
        next: value => this.router.navigateByUrl('/inbox'),
        error: (err: HttpErrorResponse) => {
          if (!err.status) {  // err.status === 0
            this.authForm.setErrors({ networkError: true });
          }
        }
      });
  }
}
