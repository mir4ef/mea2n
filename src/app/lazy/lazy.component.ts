import { Component, OnInit } from '@angular/core';

import { LazyService } from './lazy.service';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.less']
})

export class LazyComponent implements OnInit {
  data;
  err;

  constructor(private dataService: LazyService) { }

  ngOnInit() {
    // example with Observable
    // for an example with Promise, view lazy2 component/service
    this.dataService
      .getData()
      .subscribe(
        data => this.data = data.message,
        err => this.err = err
      );
  }
}
