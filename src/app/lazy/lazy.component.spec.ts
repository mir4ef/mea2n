import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreHttpService } from '../core/http/core-http.service';
import { TokenService } from '../core/auth/token.service';

import { LazyComponent } from './lazy.component';
import { LazyService } from './lazy.service';

describe('LazyComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LazyComponent ],
      providers: [ CoreHttpService, LazyService, TokenService ]
    })
    .compileComponents();
  }));

  it('should exist', () => {
    const fixture: ComponentFixture<LazyComponent> = TestBed.createComponent(LazyComponent);
    const component: LazyComponent = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
