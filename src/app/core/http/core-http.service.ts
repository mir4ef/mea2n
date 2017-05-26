import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TokenService } from '../auth/token.service';

// Request scheme definition
type Scheme = 'http' | 'https';

// Request params definition
interface IParams {
  [key: string]: string | number | boolean;
}

// Request options definition
interface IRequestOptions<T> {
  scheme?: Scheme;
  host?: string;
  headers?: { [key: string]: string };
  port?: number;
  path: string;
  params?: IParams;
  body?: T;
}

// Response object definition
export interface IResponse {
  success: boolean;
  message: any;
  token?: string;
}

@Injectable()
export class CoreHttpService {
  private apiURI = '/api/v1/';

  constructor(
    private http: Http,
    private router: Router,
    private tokenService: TokenService
  ) { }

  /**
   * @description Handles HTTP GET requests
   * @param {IRequestOptions} request - The request object containing the data for the request
   * @returns {Observable<Response>}
   */
  public apiGet(request: IRequestOptions<{}>): Observable<IResponse> {
    return this.http.get(this.getURL(request), { headers: this.getHeaders(request.headers) })
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * @description Handles HTTP POST requests
   * @param {IRequestOptions} request - The request object containing the data for the request
   * @returns {Observable<Response>}
   */
  public apiPost(request: IRequestOptions<{}>) {
    return this.http.post(this.getURL(request), this.getBody(request.body), { headers: this.getHeaders(request.headers) })
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   * @description Handle success responses from the server
   * @param {Response} res - The successful response from the server
   * @returns {Object} Returns a parsed object to the client
   */
  private handleResponse(res: Response) {
    return res.json();
  }

  /**
   * @description Handle response errors
   * @param {Response} err - The error response
   * @returns {Promise<never>}
   */
  private handleError = (err: Response) => {
    if (err.status === 403) {
      this.tokenService.token = '';
      this.router.navigate(['/login']);
    }

    return Promise.reject(err.json());
  }

  /**
   * @description Build the endpoint URL with a default URI or passed URL options like scheme, host, etc.
   * @param {IRequestOptions} options - The request options
   * @returns {String} Completed URL to an endpoint
   */
  private getURL(options): string {
    // set the url to the default api URI
    let url: string = this.apiURI;

    // build a completely new URL if the requester needs it
    if (options.scheme && options.host) {
      url = `${options.scheme}://${options.host}`;

      if (options.port) {
        url += `:${options.port}/`;
      } else {
        url += '/';
      }
    }

    if (options.path) {
      url += options.path;
    }

    if (options.params) {
      url += this.getQueryParams(options.params);
    }

    return url;
  }

  /**
   * @description Build the URL query params
   * @param {Object} params - The query params to be appended to the URL
   * @return {String} A single string with all the params and values to be appended to the URL
   */
  private getQueryParams(params: IParams): string {
    const paramKeys: Array<string> = Object.keys(params);
    const len: number = paramKeys.length;

    // the reducer method that generates the query string
    function makeQueryParams(acc: string, param: string, index: number): string {
      if ((index + 1) === len) {
        return `${acc}${param}=${encodeURIComponent(params[param].toString())}`;
      }

      return `${acc}${param}=${encodeURIComponent(params[param].toString())}&`;
    }

    return paramKeys.reduce(makeQueryParams, '?');
  }

  /**
   * @description Get the headers for this request or an empty Headers object
   * @return {Headers} The Angular headers object
   */
  private getHeaders(headers): Headers {
    const token = this.tokenService.token;
    let headerOptions = new Headers({});

    // pass the headers if headers were provided for the call
    if (headers) {
      headerOptions = new Headers(headers);
    }

    // add the token to the call if present and no token was passed with the headers already
    if (token && !headerOptions.has('x-access-token')) {
      headerOptions.append('x-access-token', token);
    }

    return headerOptions;
  }

  /**
   * @description Get the request body or an empty/null body object
   * @return {Object} The request body or null object
   */
  private getBody(body) {
    if (!body) {
      return null;
    }

    return body;
  }
}
