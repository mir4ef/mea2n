import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { HomeModule } from './home/home.module';
import { EagerModule } from './eager/eager.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ComponentsModule,
    HomeModule,
    EagerModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
