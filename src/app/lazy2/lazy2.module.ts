import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Lazy2RoutingModule } from './lazy2-routing.module';
import { Lazy2Component } from './lazy2.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    Lazy2RoutingModule
  ],
  declarations: [
    Lazy2Component,
    ListComponent,
    DetailComponent
  ]
})
export class Lazy2Module { }
