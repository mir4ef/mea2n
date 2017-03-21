'use strict';

const def = {
  swagger: '2.0',
  info: {
    title: 'My Title', // Title (required)
    version: 'v1', // Version (required)
    description: 'A sample API' // Description (optional)
  },
  schemes: ['https'], // Schemes (optional)
  basePath: '/api' // API base path (optional)
  // host: config.host // Host (optional)
};

module.exports = def;
