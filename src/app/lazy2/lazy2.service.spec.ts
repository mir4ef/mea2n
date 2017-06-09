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

import { Lazy2Service } from './lazy2.service';

describe('Lazy2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        Lazy2Service,
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

  it('should exist', inject([Lazy2Service], (service: Lazy2Service) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list of entries', inject([Lazy2Service, MockBackend], (service: Lazy2Service, backend: MockBackend) => {
    const sampleEntries = [
      {
        id: 123,
        name: 'Entry 1'
      },
      {
        id: 456,
        name: 'Entry 2'
      }
    ];
    const response = new ResponseOptions({ body: JSON.stringify(sampleEntries) });
    const baseResponse = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe('/api/v1/sampleEntries');
      }
    );

    service.getEntries().then(data => {
      expect(data).toEqual(sampleEntries);
    })
  }));
});
