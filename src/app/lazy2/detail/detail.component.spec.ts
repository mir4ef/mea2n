import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';

import { Lazy2Module } from '../lazy2.module';
import { DetailComponent } from './detail.component';
import { Lazy2Service } from '../lazy2.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let entryService: Lazy2Service;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        Lazy2Module,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);

    component = fixture.componentInstance;

    entryService = fixture.debugElement.injector.get(Lazy2Service);

    spy = spyOn(entryService, 'getEntry').and.returnValue({ id: 111, name: 'Name' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
