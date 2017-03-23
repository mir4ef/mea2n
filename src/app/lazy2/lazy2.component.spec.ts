import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Lazy2Module } from './lazy2.module';
import { Lazy2Component } from './lazy2.component';

describe('Lazy2Component', () => {
  let component: Lazy2Component;
  let fixture: ComponentFixture<Lazy2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Lazy2Module,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lazy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
