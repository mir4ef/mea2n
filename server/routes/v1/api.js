'use strict';

const sampleData = require('./sample-data/sample.data');
const sampleEntries = require('./sample-entries/sample.entries.js');

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

  /**
   * *************************************************
   * END ROUTES DEFINITIONS
   * *************************************************
   */

  /**
   * *************************************************
   */

  /**
   * *************************************************
   * START ROUTES HANDLERS/METHODS
   * *************************************************
   */

  /**
   * @swagger
   * definitions:
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
   * *************************************************
   * END ROUTES HANDLERS/METHODS
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
   */

  // return the /api/v1 routes object
  return apiRouter;
}

// export the apiRoutes object for consumption in other modules
exports.apiRoutes = apiRoutes;
