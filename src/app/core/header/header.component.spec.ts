import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';
import { CoreHttpService } from '../http/core-http.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ HeaderComponent ],
      providers: [ AuthService, CoreHttpService, TokenService ]
    })
    .compileComponents();
  }));

  it('should exist', () => {
    const fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
    const component: HeaderComponent = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
