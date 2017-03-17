'use strict';

// load the packages
const cluster = require('cluster');
const os = require('os');
const helpers = require('./server/helpers');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;

    helpers.logger('info', `Starting ${numCPUs} nodes...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', worker => {
        helpers.logger('info', `Node ${worker.process.pid} started!`);
    });

    cluster.on('exit', (worker, code, signal) => {
        helpers.logger('warn', `Node ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        helpers.logger('info', `Starting a new node...`);
        cluster.fork();
    });
} else {
    require('./server');
}
