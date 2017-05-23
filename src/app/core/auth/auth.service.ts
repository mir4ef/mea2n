import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreHttpService, IResponse } from '../http/core-http.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  // property to hold the url the user came from
  private fromURL: string = '/';

  constructor(private http: CoreHttpService, private tokenService: TokenService) { }

  // setter for the url the user came from
  public set requestingURL(url: string) {
    this.fromURL = url;
  }

  // getter for the url the user came from
  public get requestingURL(): string {
    return this.fromURL;
  }

  /**
   * @description login the user
   * @param {Object} user - The username and password of the user
   * @returns {Observable<IResponse>} Session details
   */
  public login(user): Observable<IResponse> {
    const opt = {
      body: user,
      path: 'auth'
    };

    return this.http.apiPost(opt).map(data => {
      this.tokenService.token = data.token;

      return data;
    });
  }

  /**
   * @description Logout the user
   * @return {void}
   */
  public logout(): void {
    this.tokenService.token = '';
  }

  /**
   * @description Check if the user has a valid token
   * @return {Boolean} Whether the token is valid or not
   */
  public isLoggedIn(): boolean {
    return !!this.tokenService.token;
  }

  /**
   * @description Get the user info from the token
   * @return {Observable<IResponse>} User details response
   */
  public getUser(): Observable<IResponse> {
    return this.http.apiGet({ path: 'me'});
  }
}
