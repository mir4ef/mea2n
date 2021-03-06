import { Component } from '@angular/core';

import { fade } from '../shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.less' ],
  animations: [ fade('1.5s') ]
})
export class HomeComponent { }
