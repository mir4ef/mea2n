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

import { TokenService } from '../core/auth/token.service';
import { CoreHttpService } from '../core/http/core-http.service';

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
    const sampleData = {
      id: 123,
      title: 'Title',
      bodyText: 'Body text.'
    };
    const response = new ResponseOptions({ body: JSON.stringify(sampleData) });
    const baseResponse = new Response(response);

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
});
