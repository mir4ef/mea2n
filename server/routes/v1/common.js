'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 * @description Handler to validate a token or block users from accessing protected routes
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The method allowing the application to continue
 * @returns {void} Returns either an error message or allows the user to continue to protected routes
 */
function validateToken(req, res, next) {
  // check header, url parameters or post parameters for token
  const token = req.body.token || req.params.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verify secret and check expiration
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ success: false, message: 'Failed to authenticate token!' });
      }

      // if everything is good, save the request to be used by other routes
      req.decoded = decoded;

      // allow the users to continue to the protected routes
      next();
    });
  } else {
    // if there is no token, return an HTTP response of 403 (forbidden) and an error message
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
}

/**
 * Below are some shared definitions to be used across all routes e.g. server errors, etc.
 */

/**
 * @swagger
 * definitions:
 *   FailedToken:
 *     properties:
 *       success:
 *         type: boolean
 *         example: false
 *       message:
 *         type: string
 *         example: 'Token not valid or not provided!'
 *
 *   BadRequest:
 *     properties:
 *       success:
 *         type: boolean
 *         example: false
 *       message:
 *         type: string
 *         example: 'Invalid request or parameter passed'
 *
 *   ServerError:
 *     properties:
 *       success:
 *         type: boolean
 *         example: false
 *       message:
 *         type: string
 *         example: 'Server or database error!'
 */

/**
 * END shared definitions
 */

/**
 * @swagger
 * definitions:
 *   Authenticate:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       success:
 *         type: boolean
 *         default: true
 *       message:
 *         type: string
 *         example: 'Successfully authenticated!'
 *       token:
 *         type: string
 *         example: 'token.in.jwt.format'
 *
 *   FailedAuthenticate:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       success:
 *         type: boolean
 *         default: false
 *       message:
 *         type: string
 *         example: 'Wrong credentials!'
 *
 *   NotInLDAPGroup:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       success:
 *         type: boolean
 *         default: false
 *       message:
 *         type: string
 *         example: 'User is not part of the LDAP group'
 */

/**
 * @swagger
 * /v1/authenticate:
 *   post:
 *     summary: Verify user and get a token
 *     description: Login to the application and generate a token
 *     tags: [Authenticate]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: username
 *         description: Username in the format `firstname.lastname`.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful verification of credentials and returns a token
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Authenticate'
 *       400:
 *         description: bad request - a param is missing or invalid
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequest'
 *       401:
 *         description: could not verify credentials
 *         schema:
 *           type: object
 *           $ref: '#/definitions/FailedAuthenticate'
 *       403:
 *         description: The user authenticated successfully, but is not part of the LDAP group to access the application
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotInLDAPGroup'
 *       500:
 *         description: failed to connect to LDAP or another server error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ServerError'
 */

exports.validateToken = validateToken;
