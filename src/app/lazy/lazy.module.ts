import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { LazyService } from './lazy.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    LazyRoutingModule
  ],
  declarations: [
    LazyComponent
  ],
  providers: [
    LazyService
  ]
})

export class LazyModule { }
