import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';
import { CoreHttpService } from '../http/core-http.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ HeaderComponent ],
      providers: [ AuthService, CoreHttpService, TokenService ]
    })
    .compileComponents();
  }));

  it('should exist', () => {
    const fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
    const component: HeaderComponent = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
