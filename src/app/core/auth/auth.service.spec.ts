import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  BaseRequestOptions,
  RequestMethod,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from './token.service';
import { CoreHttpService, IResponse } from '../http/core-http.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [
        CoreHttpService,
        AuthService,
        TokenService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [
            MockBackend,
            BaseRequestOptions
          ]
        }
      ]
    });
  });

  beforeEach(() => {
    // reset the requestURL before each unit test
    const authService = TestBed.get(AuthService);
    authService.requestedURL = '';

    // reset the token before each unit test
    const tokenService = TestBed.get(TokenService);
    tokenService.token = '';
  });

  afterAll(() => {
    // reset the requestURL after done with this unit test
    const authService = TestBed.get(AuthService);
    authService.requestedURL = '';

    // reset the token after done with this unit test
    const tokenService = TestBed.get(TokenService);
    tokenService.token = '';
  });

  it('should exist', inject([ AuthService ], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should not have requestURL set at initialization', inject([ AuthService ], (service: AuthService) => {
    expect(service.requestedURL).toEqual('');
  }));

  it('should set the requestURL to the passed value', inject([ AuthService ], (service: AuthService) => {
    service.requestedURL = '/route';

    expect(service.requestedURL).toEqual('/route');
  }));

  it('should login user', inject([ AuthService, TokenService, MockBackend ], (service: AuthService, tokenService: TokenService, backend: MockBackend) => {
    const user = {
      username: 'user.name',
      password: 'password'
    };
    const sampleData: IResponse = { success: true, message: 'logged in', token: 'jwt.token.string' };
    const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(sampleData) });
    const baseResponse: Response = new Response(response);

    spyOn(service, 'updateLoggedInState').and.callThrough();

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Post);
        expect(c.request.url).toBe('/api/v1/auth');
      }
    );

    service.login(user).subscribe(data => {
      expect(data).toEqual(sampleData);
      expect(data.success).toBeTruthy();
      expect(service.updateLoggedInState).toHaveBeenCalled();
      expect(service.updateLoggedInState).toHaveBeenCalledTimes(1);
      expect(service.updateLoggedInState).toHaveBeenCalledWith();
      expect(tokenService.token).toBe(data.token);
    })
  }));

  it('should get the logged in state of the user', inject([ AuthService, TokenService ], (service: AuthService, tokenService: TokenService) => {
    tokenService.token = 'token';
    service.updateLoggedInState();

    service.getLoggedInState().subscribe(state => expect(state).toBeTruthy());
  }));

  it('should return false if user is not logged in', inject([ AuthService, TokenService ], (service: AuthService, tokenService: TokenService) => {
    tokenService.token = '';

    expect(service.isLoggedIn).toBeFalsy();
  }));

  it('should return true if user is logged in', inject([ AuthService, TokenService ], (service: AuthService, tokenService: TokenService) => {
    tokenService.token = 'token';

    expect(service.isLoggedIn).toBeTruthy();
  }));

  it('should get user details', inject([ AuthService, MockBackend ], (service: AuthService, backend: MockBackend) => {
    const sampleData: IResponse = { success: true, message: 'decoded token info' };
    const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(sampleData) });
    const baseResponse: Response = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe('/api/v1/me');
      }
    );

    service.getUser().subscribe(data => expect(data).toEqual(sampleData));
  }));

  it('should logout the user', inject([ AuthService ], (service: AuthService) => {
    spyOn(service, 'updateLoggedInState').and.callThrough();

    service.logout();

    expect(service.updateLoggedInState).toHaveBeenCalled();
    expect(service.updateLoggedInState).toHaveBeenCalledTimes(1);
    expect(service.updateLoggedInState).toHaveBeenCalledWith();
    expect(service.isLoggedIn).toBeFalsy();
  }));
});
