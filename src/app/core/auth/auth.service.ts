import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(private http: Http, private tokenService: TokenService) { }

  public login(user): Observable<Response> {
    return this.http
      .post('/api/v1/auth', user)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  public logout() {
    this.tokenService.token = '';
  }

  public isLoggedIn() {
    return !!this.tokenService.token;
  }

  public getUser() {
    return this.http
      .get('/api/v1/me', this.tokenService.authHeaders())
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleResponse = (res: Response) => {
    const resp = res.json();

    if (resp && resp.token) {
      this.tokenService.token = resp.token;
    }

    return resp;
  }

  private handleError(err: Response) {
    return Promise.reject(err.json());
  }
}
