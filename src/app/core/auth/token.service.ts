import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TokenService {
  private tokenKey: string = 'token';

  constructor() { }

  public set token(token: string) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  public get token(): string {
    return localStorage.getItem(this.tokenKey);
  }

  public authHeaders() {
    const token = this.token;

    if (token) {
      const headers = new Headers({ 'x-access-token': token });

      return new RequestOptions({ headers });
    }
  }
}
