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
 *      responses:
 *          '200':
 *              description: User has been signed up
 *          '400':
 *              description: Missing username or password
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.post('/', controller.signUp);

module.exports = router;