import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  constructor(
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

    this.auth.signin(this.authForm.value)
        .subscribe({
          next: value => this.router.navigateByUrl('/inbox'),
          error: (err: HttpErrorResponse) => {
            const { error, status } = err;
            if (error.username || error.password) {
              this.authForm.setErrors({ credentials: true });
            }
            if (!status) {  // status === 0
              this.authForm.setErrors({ networkError: true });
            }
          }
        });
  }
}
