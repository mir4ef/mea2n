import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Lazy2RoutingModule } from './lazy2-routing.module';
import { Lazy2Service } from './lazy2.service';
import { Lazy2Component } from './lazy2.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Lazy2RoutingModule
  ],
  declarations: [
    Lazy2Component,
    ListComponent,
    DetailComponent
  ],
  providers: [
    Lazy2Service
  ]
})
export class Lazy2Module { }
