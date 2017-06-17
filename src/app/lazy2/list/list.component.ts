import { Component, OnInit } from '@angular/core';

import { IEntry, Lazy2Service } from '../lazy2.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ListComponent implements OnInit {
  public entries: IEntry[];
  public errorMsg: string = '';

  constructor(private entryService: Lazy2Service) { }

  ngOnInit() {
    // example with Promise
    // for an example with Observable, view lazy component/service
    this.entryService.getEntries().then(
      res => this.entries = res.message,
      err => this.errorMsg = err.message
    );
  }
}
