import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from '../auth/token.service';
import { TokenInterceptor } from '../interceptors/token.interceptor';

import { CoreHttpService, IResponse } from './core-http.service';

describe('CoreHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        CoreHttpService,
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ],
    });
  });

  beforeEach(inject([ TokenService ], (tokenService: TokenService) => {
    // reset the token before each unit test
    tokenService.token = '';
  }));

  afterEach(inject([ HttpTestingController ], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  afterAll(inject([ TokenService ], (tokenService: TokenService) => {
    // reset the token before each unit test
    tokenService.token = '';
  }));

  it('should exist', inject([ CoreHttpService ], (service: CoreHttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should GET requested endpoint and attach the provided headers',
    inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
      const headers = {
        header1: 'value 1',
        header2: 'value 2'
      };
      const res: IResponse = { success: true, message: 'got data' };
      let actualRes: IResponse;

      service.apiGet({ path: 'endpoint', headers }).subscribe((data: IResponse) => {
        actualRes = data;
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

      req.flush(res);

      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.has('header1')).toBeTruthy();
      expect(req.request.headers.get('header1')).toBe(headers.header1);
      expect(req.request.headers.has('header2')).toBeTruthy();
      expect(req.request.headers.get('header2')).toBe(headers.header2);
      expect(actualRes).toEqual(res);
    }));

  it('should handle 403 and navigate to login page if not authorized to access requested endpoint',
    inject([ Router, CoreHttpService, TokenService, HttpTestingController ], (router: Router, service: CoreHttpService, tokenService: TokenService, httpMock: HttpTestingController) => {
      const res: HttpErrorResponse = {
        error: { success: false, message: 'not authorized' },
        message: 'error message',
        name: 'HttpErrorResponse',
        ok: false,
        headers: null,
        status: 403,
        statusText: 'OK',
        url: '/api/v1/endpoint',
        type: null
      };
      let actualRes: IResponse;

      spyOn(router, 'navigate');
      tokenService.token = '';

      service.apiGet({ path: 'endpoint' }).subscribe(null, (error: HttpErrorResponse) => {
        actualRes = error.error;

        expect(error.status).toBe(403);
        expect(actualRes).toEqual(res.error);
        expect(actualRes.success).toBeFalsy();
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith([ '/login' ]);
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

      req.flush(res, { status: 403, statusText: 'OK' });

      expect(req.request.method).toEqual('GET');
      expect(tokenService.token).toBeNull();
  }));

  it('should handle unsuccessful error code from the server',
    inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
      const res: HttpErrorResponse = {
        error: { success: false, message: 'server error message' },
        message: 'error message',
        name: 'HttpErrorResponse',
        ok: false,
        headers: null,
        status: 500,
        statusText: 'OK',
        url: '/api/v1/endpoint',
        type: null
      };
      let actualRes: IResponse;

      service.apiGet({ path: 'endpoint' }).subscribe(null, (error: HttpErrorResponse) => {
        actualRes = error.error;

        expect(error.status).toBe(500);
        expect(actualRes).toEqual(res.error);
        expect(actualRes.success).toBeFalsy();
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

      req.flush(res, { status: 500, statusText: 'OK' });

      expect(req.request.method).toEqual('GET');
    }));

  it('should handle a network or a clint-side error',
    inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
      const res: HttpErrorResponse = {
        error: null,
        message: null,
        name: 'HttpErrorResponse',
        ok: false,
        headers: null,
        status: 0,
        statusText: 'Unknown Error',
        url: null,
        type: null
      };
      let actualRes: HttpErrorResponse;

      service.apiGet({ path: 'endpoint' }).subscribe(null, (error: HttpErrorResponse) => {
        actualRes = error;

        expect(actualRes.status).toBe(0);
        expect(actualRes.message).toEqual('Http failure response for /api/v1/endpoint: 0 Unknown Error');
      });

      const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

      req.flush(res, { status: 0, statusText: 'Unknown Error' });

      expect(req.request.method).toEqual('GET');
    }));

  describe('GET', () => {
    it('should GET requested endpoint with success 200',
      inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
        const res: IResponse = { success: true, message: 'got data' };
        let actualRes: IResponse;

        service.apiGet({ path: 'endpoint' }).subscribe((data: IResponse) => {
          actualRes = data;
        });

        const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

        req.flush(res);

        expect(req.request.method).toEqual('GET');
        expect(actualRes).toEqual(res);
    }));

    it('should GET requested endpoint with query params and success 200',
      inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
        const res: IResponse = { success: true, message: 'got data' };
        let actualRes: IResponse;

        service.apiGet({ path: 'endpoint', params: { param1: 'value1', param2: 'value 2' } }).subscribe((data: IResponse) => {
          actualRes = data;
        });

        const req: TestRequest = httpMock.expectOne('/api/v1/endpoint?param1=value1&param2=value%202');

        req.flush(res);

        expect(req.request.method).toEqual('GET');
        expect(actualRes).toEqual(res);
        expect(actualRes.success).toBeTruthy();
    }));

    it('should GET requested endpoint with specified schema and url and success 200',
      inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
        const res: IResponse = { success: true, message: 'got data' };
        let actualRes: IResponse;

        service.apiGet({ scheme: 'https', host: 'api.levodigital.com', path: 'v1/endpoint' }).subscribe((data: IResponse) => {
          actualRes = data;
          expect(data).toEqual(res);
          expect(data.success).toBeTruthy();
        });

        const req: TestRequest = httpMock.expectOne('https://api.levodigital.com/v1/endpoint');

        req.flush(res);

        expect(req.request.method).toEqual('GET');
        expect(actualRes).toEqual(res);
    }));

    it('should GET requested endpoint with specified schema, url and port and success 200',
      inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
        const res: IResponse = { success: true, message: 'got data' };
        let actualRes: IResponse;


        service.apiGet({ scheme: 'https', host: 'api.levodigital.com', port: 3000, path: 'v1/endpoint' }).subscribe((data: IResponse) => {
          actualRes = data;
        });

        const req: TestRequest = httpMock.expectOne('https://api.levodigital.com:3000/v1/endpoint');

        req.flush(res);

        expect(req.request.method).toEqual('GET');
        expect(actualRes).toEqual(res);
    }));

    it('should GET requested endpoint with specified schema, url and no path and success 200',
      inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
        const res: IResponse = { success: true, message: 'got data' };
        let actualRes: IResponse;

        service.apiGet({ scheme: 'https', host: 'api.levodigital.com', path: '' }).subscribe((data: IResponse) => {
          actualRes = data;
        });

        const req: TestRequest = httpMock.expectOne('https://api.levodigital.com/');

        req.flush(res);

        expect(req.request.method).toEqual('GET');
        expect(actualRes).toEqual(res);
    }));
  });

  describe('POST', () => {
    it('should POST requested endpoint with success 200',
      inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
        const body = { key: 'data for post' };
        const res: IResponse = { success: true, message: 'got data' };
        let actualRes: IResponse;

        service.apiPost({ path: 'endpoint', body }).subscribe((data: IResponse) => {
          actualRes = data
        });

        const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

        req.flush(res);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(body);
        expect(actualRes).toEqual(res);
    }));

    it('should POST requested endpoint with no body and success 200',
      inject([ CoreHttpService, HttpTestingController ], (service: CoreHttpService, httpMock: HttpTestingController) => {
        const res: IResponse = { success: true, message: 'got data' };
        let actualRes: IResponse;

        service.apiPost({ path: 'endpoint' }).subscribe((data: IResponse) => {
          actualRes = data;
        });

        const req: TestRequest = httpMock.expectOne('/api/v1/endpoint');

        req.flush(res);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toBeNull();
        expect(actualRes).toEqual(res);
    }));
  });
});
