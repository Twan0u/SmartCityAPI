const controller = require("../controleur/signup");
const router = require("express").Router();

/**
 * @swagger
 * /signup:
 *  post:
 *      summary: take a username and a password and sign the user up (user is a tutor)
 *      tags:
 *          - signup
 *      requestBody:
 *          description: username and password
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          phone:
 *                              type: string
 *      responses:
 *          '200':
 *              description: User has been signed up
 *          '400':
 *              description: Missing username or password
 *          '401':
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '409':
 *              description: Username already exists
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 *
 */
router.post('/', controller.signUp);

module.exports = router;