import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private auth: AuthService) {
  }

  public validate = (formControl: FormControl): Observable<ValidationErrors | null> =>
    this.auth.usernameAvailable(formControl.value).pipe(
      map(value => {
        if (value.available) {  // not necessary, unavailable username will emit an error code 422
          return null;          // and won't come to the map operator, so map(() => null) is enough
        }
      }),
      catchError((errorData: HttpErrorResponse) => errorData.error.username ?
                          of({ nonUniqueUsername: true }) :
                          of({ networkError: true }))
    );
}
