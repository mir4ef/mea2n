'use strict';

const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const specReporter = new SpecReporter({
  suite: {
    displayNumber: true
  },
  spec: {
    displayPending: true,
    displayErrorMessages: true,
    displaySuccessful: true,
    displayFailed: true,
    displayDuration: true
  },
  summary: {
    displayErrorMessages: true,
    displayFailed: true,
    displayDuration: true
  }
});

// load the jasmine config file
jasmine.loadConfigFile('spec/support/jasmine.json');

// clear any reporters (including the default one)
jasmine.clearReporters();

// add/load the spec reporter
jasmine.addReporter(specReporter);

// run the unit tests
jasmine.execute();
