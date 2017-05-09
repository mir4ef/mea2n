import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CheckmarkPipe } from './checkmark/checkmark.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CheckmarkPipe
  ],
  declarations: [
    CheckmarkPipe
  ]
})
export class SharedModule { }
