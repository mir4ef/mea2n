import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ComponentsModule,
        RouterTestingModule
      ],
      declarations: [ AppComponent ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();

    fixture.destroy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;

    expect(app.title).toEqual('app works!');

    fixture.destroy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain('app works!');

    fixture.destroy();
  }));
});
