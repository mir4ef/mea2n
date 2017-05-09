import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/auth/auth.service';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
