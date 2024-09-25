import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl: string = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject<boolean | null>(null); //$ for observable to recognize it
  username: string = '';
  constructor(private httpClient: HttpClient) {
    // console.log('AuthService instance created');
  }

  usernameAvailable(_username: string) {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username: _username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    //const { username, password, passwordConfirmation } = credentials;
    return this.httpClient
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        //tap only let us intercept the value and no change will be added
        tap(({ username }) => {
          this.signedin$.next(true); //now we are signed in
          // any error thrown , tap will be skipped which is what we want
          this.username = username;
        })
      );
  }

  chechAuth() {
    return this.httpClient
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username } /*console.log(authenticated)*/) => {
          //debugger;
          //console.log(`check auth `, authenticated);
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.httpClient
      .post(`${this.rootUrl}/auth/signout`, {
        /*empty post request */
      })
      .pipe(
        tap((val) => {
          //console.log('singed out successfuly', val);
          this.signedin$.next(false);
        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.httpClient
      .post<SignedinResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        //tap will be skipped in case error
        tap(({ username }) => {
          //console.log('singed in successfuly', val);
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
