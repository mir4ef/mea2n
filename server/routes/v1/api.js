'use strict';

// import the route methods
const common = require('./common');
const auth = require('./auth/auth');
const sampleData = require('./sample-data/sample.data');
const sampleEntries = require('./sample-entries/sample.entries.js');
const data = require('./data/data');

function apiRoutes(app, express) {
  // get an instance of the express router
  const apiRouter = express.Router();

  /**
   * *************************************************
   * START ROUTES DEFINITIONS
   * *************************************************
   */

  /**
   * UNPROTECTED ROUTES
   */
  // api endpoint for testing
  apiRouter.get('/', (req, res) => res.json({ success: true, message: 'API is working!' }));

  // sample api endpoint to return sample data to the client
  apiRouter.route('/sampleData').get(sampleData.sampleDataGET);

  // sample api endpoint to return sample array of data ot the client
  apiRouter.route('/sampleEntries').get(sampleEntries.sampleEntriesGET);

  // return only one entry
  apiRouter.route('/sampleEntries/:id').get(sampleEntries.sampleEntryGET);

  // authentication endpoint
  apiRouter.route('/auth').post(auth.authPOST);

  /**
   * route middleware to verify a token
   *
   * NOTE: it needs to be after all unprotected and before all protected routes
   * any route before it will NOT be protected by the middleware, so anybody CAN access it
   * any route after it will be protected by the middleware
   */
  apiRouter.use(common.validateToken);

  /**
   * PROTECTED ROUTES
   */

  // api endpoint for testing protected api endpoints
  apiRouter.get('/protected', (req, res) => {
    res.json({ success: true, message: 'protected API is working!' });
  });

  // protected data endpoint
  apiRouter.get('/data/:id', data.dataGET);

  // api endpoint to get user information
  apiRouter.get('/me', (req, res) => res.send(req.decoded));

  /**
   * *************************************************
   * END ROUTES DEFINITIONS
   * *************************************************
   */

  /**
   * Describe the test api endpoints so swagger can generate documentation for them
   */

  /**
   * @swagger
   * /v1/:
   *   get:
   *     summary: Reach unprotected API endpoints
   *     description: An API endpoint for you to make sure you are reaching the server and its unprotected api endpoints (like /authenticate, etc.)
   *     tags: [Endpoints for Testing]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns an object
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *             message:
   *               type: string
   *               example: 'reached API!'
   *       500:
   *         description: server error
   *         schema:
   *           type: object
   *           $ref: '#/definitions/ServerError'
   * /v1/protected:
   *   get:
   *     summary: Reach protected API endpoints
   *     description: An API endpoint for you to make sure you are reaching the server and its protected api endpoints (like /collaborators, etc.)
   *     tags: [Endpoints for Testing]
   *     security:
   *       - APIKey: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns an object
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *             message:
   *               type: string
   *               example: 'reached protected API!'
   *       403:
   *         description: failed to authenticate the supplied token or no token was provided
   *         schema:
   *           type: object
   *           $ref: '#/definitions/FailedToken'
   *       500:
   *         description: server error
   *         schema:
   *           type: object
   *           $ref: '#/definitions/ServerError'
   */

  // return the /api/v1 routes object
  return apiRouter;
}

// export the apiRoutes object for consumption in other modules
exports.apiRoutes = apiRoutes;
