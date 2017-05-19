import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  it('should exist', () => {
    const fixture: ComponentFixture<FooterComponent> = TestBed.createComponent(FooterComponent);
    const component: FooterComponent = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
