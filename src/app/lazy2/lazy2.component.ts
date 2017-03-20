import { Component, OnInit } from '@angular/core';

import { Lazy2Service } from './lazy2.service';

@Component({
  selector: 'app-lazy2',
  templateUrl: './lazy2.component.html',
  styleUrls: ['./lazy2.component.less'],
  providers: [Lazy2Service]
})
export class Lazy2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
}