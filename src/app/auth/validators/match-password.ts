import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchPassword implements Validator {
  public validate(formGroup: FormGroup): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;
    if (passwordConfirmation === password) {
      return null;
    }
    return { passwordsDontMatch: true };
  }
}
