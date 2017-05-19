import { Injectable } from '@angular/core';

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
}
