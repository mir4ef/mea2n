import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { sampleEntry, Lazy2Service } from '../lazy2.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  entry:sampleEntry;

  constructor(private route: ActivatedRoute, private entryService: Lazy2Service) {

  }

  ngOnInit() {
    const id = Number.parseInt(this.route.snapshot.params['id'], 10);
    this.entryService.getEntry(id).then(entry => this.entry = entry);
  }
}