'use strict';

const def = {
  swagger: '2.0',
  info: {
    title: 'My Title', // Title (required)
    version: 'v1', // Version (required)
    description: 'A sample API' // Description (optional)
  },
  schemes: ['https'], // Schemes (optional)
  basePath: '/api', // Host (optional)
  host: 'localhost:8080' // Host (optional)
};

module.exports = def;
