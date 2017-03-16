import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = Number.parseInt(this.route.snapshot.params['id'], 10);
    // call service and pass the id
  }

}
