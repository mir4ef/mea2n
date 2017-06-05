import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';

import { Lazy2Module } from '../lazy2.module';
import { DetailComponent } from './detail.component';
import { Lazy2Service } from '../lazy2.service';

describe('DetailComponent', () => {

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

  it('should create', () => {
    const fixture: ComponentFixture<DetailComponent> = TestBed.createComponent(DetailComponent);
    const component: DetailComponent = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should get the details of the selected element by calling getEntry promise', async(() => {
    const sampleEntry = { id: 123, name: 'Name' };
    const fixture: ComponentFixture<DetailComponent> = TestBed.createComponent(DetailComponent);
    const component: DetailComponent = fixture.componentInstance;
    const lazy2Service: Lazy2Service = fixture.debugElement.injector.get(Lazy2Service);

    spyOn(lazy2Service, 'getEntry').and.returnValue(sampleEntry);

    fixture.detectChanges();

    expect(lazy2Service.getEntry).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(component.entry).toEqual(sampleEntry);
    });
  }));
});
