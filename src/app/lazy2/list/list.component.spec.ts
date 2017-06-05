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

    expect(component).toBeTruthy();
  });

  it('should get a list of entries by calling getEntries promise', async(() => {
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
    const len = sampleEntries.length;
    const fixture: ComponentFixture<ListComponent> = TestBed.createComponent(ListComponent);
    const component: ListComponent = fixture.componentInstance;
    const lazy2Service: Lazy2Service = fixture.debugElement.injector.get(Lazy2Service);

    spyOn(lazy2Service, 'getEntries').and.returnValue(Promise.resolve({ message: sampleEntries }));

    fixture.detectChanges();

    expect(lazy2Service.getEntries).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(component.entries).toEqual(sampleEntries);
      expect(component.entries.length).toBe(len);
    });
  }));
});
