const LoginController = require("../controleur/login");
const router = require("express").Router();

/**
 * @swagger
 * /login:
 *  post:
 *      summary: take a username and a password and return a JWT Token.
 *      tags:
 *          - login
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
 *      responses:
 *          '200':
 *              description: A JWT token with user info
 *          '400':
 *              description: Missing username or password
 *          '401':
 *              description: Wrong username or password
 *          '404':
 *              description: username does not exist
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.post('/', LoginController.getToken);

module.exports = router;