'use strict';

const sampleData = {
    id: 123,
    title: 'Title',
    bodyText: 'Body text.'
}

function sampleDataGET(req, res, next) {
    return res.json({ success: true, message: sampleData });
}

exports.sampleDataGET = sampleDataGET;