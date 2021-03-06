import { Component } from '@angular/core';

import { fade } from '../shared/animations';

@Component({
  selector: 'app-eager',
  templateUrl: './eager.component.html',
  styleUrls: [ './eager.component.less' ],
  animations: [ fade() ]
})
export class EagerComponent { }
