import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.signedIn$
               .pipe(
                 skipWhile(signedIn => signedIn === null),
                 take(1),
                 tap(signedIn => {
                   if (!signedIn) {
                     this.router.navigateByUrl('/');
                   }
                 })
               );
  }
}
