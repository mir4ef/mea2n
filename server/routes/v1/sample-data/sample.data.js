'use strict';

const logger = require('../../../logger').logger;
const sampleData = {
  id: 123,
  title: 'Title',
  bodyText: 'Body text.'
};

function sampleDataGET(req, res, next) {
  if (!sampleData) {
    logger('error', `no data found`);

    return next({ message: 'no data...', code: 404 });
  }

  return res.json({ success: true, message: sampleData });
}

exports.sampleDataGET = sampleDataGET;
