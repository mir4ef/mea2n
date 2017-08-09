import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenService } from './auth/token.service';
import { CoreHttpService } from './http/core-http.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoadingIndicatorService } from './loading-indicator/loading-indicator.service';
import { SelectivePreloadingStrategy } from './preloading-strategy/preloading-strategy';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

import { throwIfAlreadyLoaded } from '../utils/module-import-guard';

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingIndicatorComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingIndicatorComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    TokenService,
    CoreHttpService,
    LoadingIndicatorService,
    SelectivePreloadingStrategy,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
