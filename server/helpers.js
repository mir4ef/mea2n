'use strict';

const config = require('./config');
const logger = require('./logger').logger;

/**
 * @description Handler to set the headers to handle CORS requests
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The call back function to allow the application to continue
 * @returns {void}
 */
function handleCORS(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  if (config.allowCORS) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  next();
}

/**
 * @description Handler for all application level errors and returns a json with the error message to the caller
 * @param {String} message The error message to be returned with the response
 * @param {Number} code The error code for the server response
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The call back function to allow the application to continue
 * @returns {Object} Object containing the error message
 */
// eslint-disable-next-line no-unused-vars
function handleError({ message = 'An error occurred', code = 500 }, req, res, next) {
  if (message.toLowerCase() === 'request entity too large') {
    // eslint-disable-next-line no-param-reassign
    code = 413;
  }

  logger('error', `error code '${code}' and message '${message}'`);

  return res.status(code).json({ success: false, message });
}

/**
 * @description Handler for HTTP request to redirect them to HTTPS
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next The call back function to allow the application to continue
 * @returns {void}
 */
function redirectToHTTPS(req, res, next) {
  if (!req.secure) {
    // request was via http, so redirect to https
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }

  // request was via https, so do no special handling
  next();
}

/**
 * @description Safely escape characters during replace or other RegEx methods
 * @param {String} str - The string that needs escaping
 * @returns {String} The string with safely escaped characters
 */
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$&');
}

// export the methods for consumption by other modules/files
exports.handleCORS = handleCORS;
exports.handleErrors = handleError;
exports.redirectToHTTPS = redirectToHTTPS;
exports.escapeRegExp = escapeRegExp;
