import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  BaseRequestOptions,
  RequestMethod,
  Response,
  ResponseOptions,
  ResponseType,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorResponse } from '../../utils/testing';
import { TokenService } from '../auth/token.service';

import { CoreHttpService, IResponse } from './core-http.service';

describe('CoreHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [
        CoreHttpService,
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
      ],
    });
  });

  it('should exist', inject([ CoreHttpService ], (service: CoreHttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should GET requested endpoint and attach a token if present',
    inject([ CoreHttpService, TokenService, MockBackend ], (service: CoreHttpService, tokenService: TokenService, backend: MockBackend) => {
    tokenService.token = 'token string';
    const res: IResponse = { success: true, message: 'got data' };
    const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
    const baseResponse: Response = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe(`/api/v1/endpoint`);
        expect(c.request.headers.has('x-access-token')).toBeTruthy();
        expect(c.request.headers.get('x-access-token')).toEqual(tokenService.token);
      }
    );

    service.apiGet({ path: 'endpoint' }).subscribe(data => {
      expect(data).toEqual(res);
      expect(data.success).toBeTruthy();
    });
  }));

  it('should GET requested endpoint and attach the provided headers',
    inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const headers = {
        header1: 'value 1',
        header2: 'value 2'
      };
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Get);
          expect(c.request.url).toBe(`/api/v1/endpoint`);
          expect(c.request.headers.has('header1')).toBeTruthy();
          expect(c.request.headers.get('header1')).toBe(headers.header1);
          expect(c.request.headers.has('header2')).toBeTruthy();
          expect(c.request.headers.get('header2')).toBe(headers.header2);
        }
      );

      service.apiGet({ path: 'endpoint', headers }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

  it('should return 403 and navigate to login page if not authorized to access requested endpoint',
    inject([ Router, CoreHttpService, TokenService, MockBackend ], (router: Router, service: CoreHttpService, tokenService: TokenService, backend: MockBackend) => {
    const res: IResponse = { success: false, message: 'not authorized' };
    const response: ResponseOptions = new ResponseOptions({ type: ResponseType.Error, status: 403, body: JSON.stringify(res) });
    const baseResponse: ErrorResponse = new ErrorResponse(response);

    spyOn(router, 'navigate');

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockError(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe(`/api/v1/endpoint`);
      }
    );

    service.apiGet({ path: 'endpoint' }).subscribe(null, error => {
      expect(error).toEqual(res);
      expect(error.success).toBeFalsy();
      expect(tokenService.token).toBeNull();
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([ '/login' ]);
    });
  }));

  describe('GET', () => {
    it('should GET requested endpoint with success 200', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Get);
          expect(c.request.url).toBe(`/api/v1/endpoint`);
        }
      );

      service.apiGet({ path: 'endpoint' }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

    it('should GET requested endpoint with query params and success 200', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Get);
          expect(c.request.url).toBe(`/api/v1/endpoint?param1=value1&param2=value%202`);
        }
      );

      service.apiGet({ path: 'endpoint', params: { param1: 'value1', param2: 'value 2' } }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

    it('should GET requested endpoint with specified schema and url and success 200', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Get);
          expect(c.request.url).toBe(`https://api.levodigital.com/v1/endpoint`);
        }
      );

      service.apiGet({ scheme: 'https', host: 'api.levodigital.com', path: 'v1/endpoint' }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

    it('should GET requested endpoint with specified schema, url and port and success 200', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Get);
          expect(c.request.url).toBe(`https://api.levodigital.com:3000/v1/endpoint`);
        }
      );

      service.apiGet({ scheme: 'https', host: 'api.levodigital.com', port: 3000, path: 'v1/endpoint' }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

    it('should GET requested endpoint with specified schema, url and no path and success 200', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Get);
          expect(c.request.url).toBe(`https://api.levodigital.com/`);
        }
      );

      service.apiGet({ scheme: 'https', host: 'api.levodigital.com', path: '' }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

    it('should GET requested endpoint with failure 500', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const res: IResponse = { success: false, message: 'got error' };
      const response: ResponseOptions = new ResponseOptions({ type: ResponseType.Error, status: 500, body: JSON.stringify(res) });
      const baseResponse: ErrorResponse = new ErrorResponse(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockError(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Get);
          expect(c.request.url).toBe(`/api/v1/endpoint`);
        }
      );

      service.apiGet({ path: 'endpoint' }).subscribe(null, error => {
        expect(error).toEqual(res);
        expect(error.success).toBeFalsy();
      });
    }));
  });

  describe('POST', () => {
    it('should POST requested endpoint with success 200', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const body = { key: 'data for post' };
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Post);
          expect(c.request.url).toBe(`/api/v1/endpoint`);
          expect(JSON.parse(c.request.getBody())).toEqual(body);
        }
      );

      service.apiPost({ path: 'endpoint', body }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

    it('should POST requested endpoint with no body and success 200', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const res: IResponse = { success: true, message: 'got data' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: Response = new Response(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockRespond(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Post);
          expect(c.request.url).toBe(`/api/v1/endpoint`);
          expect(JSON.parse(c.request.getBody())).toBeNull();
        }
      );

      service.apiPost({ path: 'endpoint' }).subscribe(data => {
        expect(data).toEqual(res);
        expect(data.success).toBeTruthy();
      });
    }));

    it('should POST requested endpoint with failure 500', inject([ CoreHttpService, MockBackend ], (service: CoreHttpService, backend: MockBackend) => {
      const body = { key: 'data for post' };
      const res: IResponse = { success: false, message: 'got error' };
      const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(res) });
      const baseResponse: ErrorResponse = new ErrorResponse(response);

      backend.connections.subscribe(
        (c: MockConnection) => {
          c.mockError(baseResponse);

          expect(c.request.method).toBe(RequestMethod.Post);
          expect(c.request.url).toBe(`/api/v1/endpoint`);
          expect(JSON.parse(c.request.getBody())).toEqual(body);
        }
      );

      service.apiPost({ path: 'endpoint', body }).subscribe(null, error => {
        expect(error).toEqual(res);
        expect(error.success).toBeFalsy();
      });
    }));
  });
});
