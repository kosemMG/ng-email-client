import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(
    private email: EmailService,
    private router: Router
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email> | Promise<Email> | Email {
    const { id } = route.params;

    return this.email.fetchById(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('inbox/not-found');
        return EMPTY;
      })
    );
  }

}
