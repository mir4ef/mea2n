import { Component, OnInit } from '@angular/core';

import { sampleEntry, Lazy2Service } from '../lazy2.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ListComponent implements OnInit {
  entries: Promise<sampleEntry[]>;

  constructor(private entryService: Lazy2Service) { }

  ngOnInit() {
    this.entries = this.entryService.getEntries();
  }
}