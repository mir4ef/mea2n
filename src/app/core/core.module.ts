import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenService } from './auth/token.service';
import { BaseService } from './base/base.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    TokenService,
    BaseService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
