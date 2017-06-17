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

import { AuthService } from '../core/auth/auth.service';
import { TokenService } from '../core/auth/token.service';
import { CoreHttpService, IResponse } from '../core/http/core-http.service';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [
        CoreHttpService,
        AuthService,
        TokenService,
        DataService,
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

  it('should exist', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return user data details', inject([DataService, MockBackend], (service: DataService, backend: MockBackend) => {
    const id = 111;
    const sampleUser: IResponse = { success: true, message: { id, name: 'Name', username: 'first.last' }};
    const response: ResponseOptions = new ResponseOptions({ body: JSON.stringify(sampleUser) });
    const baseResponse: Response = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe(`/api/v1/data/${id}`);
      }
    );

    service.getUser(id).subscribe(data => {
      expect(data).toEqual(sampleUser);
    });
  }));

  it('should return 404 if the user id doesnt exist', inject([DataService, MockBackend], (service: DataService, backend: MockBackend) => {
    const id = 111;
    const res: IResponse = { success: false, message: 'user doesnt exists' };
    const response: ResponseOptions = new ResponseOptions({ type: ResponseType.Error, status: 404, body: JSON.stringify(res) });
    const baseResponse: Response = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe(`/api/v1/data/${id}`);
      }
    );

    service.getUser(id).subscribe(data => {
      expect(data).toEqual(res);
    })
  }));

  it('should return a server error if something went wrong on the server side', inject([DataService, MockBackend], (service: DataService, backend: MockBackend) => {
    const id = 111;
    const res: IResponse = { success: false, message: 'server error' };
    const response: ResponseOptions = new ResponseOptions({ type: ResponseType.Error, status: 500, body: JSON.stringify(res) });
    const baseResponse: Response = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => {
        c.mockRespond(baseResponse);

        expect(c.request.method).toBe(RequestMethod.Get);
        expect(c.request.url).toBe(`/api/v1/data/${id}`);
      }
    );

    service.getUser(id).subscribe(data => {
      expect(data).toEqual(res);
    })
  }));
});
