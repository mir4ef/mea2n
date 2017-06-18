import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  BaseRequestOptions,
  RequestMethod,
  Response,
  ResponseOptions,
  ResponseType
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from '../core/auth/token.service';
import { CoreHttpService, IResponse } from '../core/http/core-http.service';

import { LazyService } from './lazy.service';

describe('LazyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [
        CoreHttpService,
        LazyService,
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

  it('should exist', inject([LazyService], (service: LazyService) => {
    expect(service).toBeTruthy();
  }));

  it('should return data details', inject([LazyService, MockBackend], (service: LazyService, backend: MockBackend) => {
    const sampleData: IResponse = { success: true, message: { id: 123, title: 'Title', bodyText: 'Body text.' }};
    const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(sampleData) });
    const baseResponse: Response = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe('/api/v1/sampleData');
      }
    );

    service.getData().subscribe(data => {
      expect(data).toEqual(sampleData);
    })
  }));

  it('should return a server error if something went wrong on the server side', inject([LazyService, MockBackend], (service: LazyService, backend: MockBackend) => {
    const res: IResponse = { success: false, message: 'server error' };
    const response: ResponseOptions = new ResponseOptions({ type: ResponseType.Error, status: 500, body: JSON.stringify(res) });
    const baseResponse: Response = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe('/api/v1/sampleData');
      }
    );

    service.getData().subscribe(null, error => {
      expect(error).toEqual(res);
    })
  }));
});
