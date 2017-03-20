import { Injectable } from '@angular/core';

export class sampleData {
  constructor(public id: number, public title: string, public bodyText: string) { }
}

const SAMPLEDATASET:sampleData = {
  id: 123,
  title: 'Title',
  bodyText: 'Body text.'
};

@Injectable()
export class LazyService {

  constructor() { }

  getData() {
    return new Promise<sampleData>(resolve => resolve(SAMPLEDATASET));
  }
}
