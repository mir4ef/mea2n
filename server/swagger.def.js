'use strict';

const def = {
  swagger: '2.0',
  info: {
    // Title (required)
    title: 'My Title',

    // Version (required)
    version: 'v1',

    // Description (optional)
    description: 'A sample API'
  },

  // Schemes (optional)
  schemes: ['https'],

  // API base path (optional)
  basePath: '/api'

  // Host (optional)
  // host: config.host
};

module.exports = def;
