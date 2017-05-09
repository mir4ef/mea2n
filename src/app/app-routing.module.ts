import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'lazy',
    loadChildren: 'app/lazy/lazy.module#LazyModule'
  },
  {
    path: 'lazy2',
    loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'
  },
  {
    path: 'protected',
    loadChildren: 'app/data/data.module#DataModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
