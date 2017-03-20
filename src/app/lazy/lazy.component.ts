import { Component, OnInit } from '@angular/core';

import { sampleData, LazyService } from './lazy.service';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.less']
})

export class LazyComponent implements OnInit {
  data: sampleData;

  constructor(private dataService: LazyService) { }

  ngOnInit() {
    this.dataService.getData().then(data => this.data = data);
  }
}