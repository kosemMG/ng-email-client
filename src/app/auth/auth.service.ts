import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupOrSigninResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public signedIn$ = new BehaviorSubject<boolean>(null);
  private _username = '';

  private authUrl = 'https://api.angular-email.com/auth/';

  constructor(private http: HttpClient) {
  }

  public get username() {
    return this._username;
  }

  public usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(`${ this.authUrl }username`, { username });
  }

  public signup(credentials: SignupCredentials): Observable<SignupOrSigninResponse> {
    return this.http.post<SignupOrSigninResponse>(`${ this.authUrl }signup`, credentials)
               .pipe(tap((response: SignupOrSigninResponse) => {
                 this._username = response.username;
                 this.signedIn$.next(true);
               }));
  }

  public checkAuth(): Observable<SignedInResponse> {
    return this.http.get<SignedInResponse>(`${ this.authUrl }signedin`)
               .pipe(tap(({authenticated, username}) => {
                 this._username = username;
                 this.signedIn$.next(authenticated);
               }));
  }

  public signout(): Observable<{}> {
    return this.http.post<{}>(`${this.authUrl}signout`, {})
      .pipe(tap(() => this.signedIn$.next(false)));
  }

  public signin(credentials: SigninCredentials): Observable<SignupOrSigninResponse> {
    return this.http.post<SignupOrSigninResponse>(`${this.authUrl}signin`, credentials)
      .pipe(tap((response: SignupOrSigninResponse) => {
        this._username = response.username;
        this.signedIn$.next(true);
      }));
  }
}
