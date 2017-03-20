import { Injectable } from '@angular/core';

export class sampleEntry {
  constructor(public id: number, public name: string) { }
}

const SAMPLELIST:sampleEntry[] = [
  new sampleEntry(123, 'Entry 1'),
  new sampleEntry(456, 'Entry 2'),
  new sampleEntry(789, 'Entry 3')
];

@Injectable()
export class Lazy2Service {

  getEntries() {
    return new Promise<sampleEntry[]>(resolve => resolve(SAMPLELIST));
  }

  getEntry(id: number | string) {
    return this.getEntries().then(entries => entries.find(entry => entry.id === +id));
  }
}
