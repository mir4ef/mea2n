'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../../config');
const logger = require('../../../logger').logger;
const user = {
  id: 123,
  name: 'First Last',
  username: 'first.last'
};

/**
 * @description Method to generate and sign a token
 * @param {Object} res - The response object used to send the response
 * @param {Object} appUser - Object containing some information about the user e.g. name, username, etc.
 * @returns {Object} Returns object containing the token and a success flag
 */
function generateToken(res, appUser) {
  const token = jwt.sign({
    name: appUser.name,
    username: appUser.username
  }, config.secret, {
    expiresIn: '15h'
  });

  // return the information including a token as JSON
  return res.json({
    success: true,
    message: `User ${appUser.name} authenticated successfully!`,
    token
  });
}

function authPOST(req, res, next) {
  if (!user) {
    logger('error', `invalid login`);

    return next({ message: 'invalid login', code: 401 });
  }

  if (!req.body.username || req.body.username !== 'test') {
    logger('error', `invalid user provided`);

    return next({ message: 'invalid user provided, use test', code: 401 });
  }

  if (!req.body.username || req.body.password !== 'test') {
    logger('error', `invalid password provided`);

    return next({ message: 'invalid password provided, use test', code: 401 });
  }

  return generateToken(res, user);
}

exports.authPOST = authPOST;
