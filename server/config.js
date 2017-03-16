'use strict';

const fs = require('fs');

module.exports = {
    'port': process.env.PORT || 8080,
    'env': process.env.ENV || 'development',
    'certphrase': process.env.CERTPHRASE || '',
    'maxRequests': process.env.MAX_REQUESTS || 300,
    'windowMs': process.env.WINDOW_MINUTES || 30,
    'trustProxy': process.env.TRUST_PROXY === 'true',
    'debug': process.env.APP_DEBUG === 'true',
    'allowCORS': process.env.ALLOW_CORS === 'true'
};
