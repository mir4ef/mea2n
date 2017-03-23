import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyModule } from './lazy.module';
import { LazyComponent } from './lazy.component';

describe('LazyComponent', () => {
  let component: LazyComponent;
  let fixture: ComponentFixture<LazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LazyModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
