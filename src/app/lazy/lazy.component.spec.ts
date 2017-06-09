import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import { CoreHttpService } from '../core/http/core-http.service';
import { LoadingIndicatorService } from '../core/loading-indicator/loading-indicator.service';
import { TokenService } from '../core/auth/token.service';

import { LazyComponent } from './lazy.component';
import { LazyService } from './lazy.service';

describe('LazyComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LazyComponent ],
      providers: [
        CoreHttpService,
        LazyService,
        LoadingIndicatorService,
        TokenService
      ]
    })
    .compileComponents();
  }));

  it('should exist', () => {
    const fixture: ComponentFixture<LazyComponent> = TestBed.createComponent(LazyComponent);
    const component: LazyComponent = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should get data by calling getData observable', async(
    inject([LazyService], (lazyService: LazyService) => {
      const sampleData = {
        id: 123,
        title: 'Title',
        bodyText: 'Body text.'
      };
      const fixture: ComponentFixture<LazyComponent> = TestBed.createComponent(LazyComponent);
      const component: LazyComponent = fixture.componentInstance;

      spyOn(lazyService, 'getData').and.returnValue(Observable.of({ message: sampleData }));

      fixture.detectChanges();

      expect(lazyService.getData).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.data).toEqual(sampleData);
      });
    })
  ));
});
