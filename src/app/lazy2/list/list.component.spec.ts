import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { Lazy2Service } from '../lazy2.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ ListComponent ],
      providers: [ Lazy2Service ]
    })
    .compileComponents();
  }));

  it('should exist', () => {
    const fixture: ComponentFixture<ListComponent> = TestBed.createComponent(ListComponent);
    const component: ListComponent = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
