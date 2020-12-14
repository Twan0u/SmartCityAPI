const TutorController = require("../controleur/tutor");
const router = require("express").Router();

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;
/**
 * @swagger
 * /pupils:
 *  get:
 *      summary: Returns all the pupils of a tutor (with tokens)
 *      tags:
 *          - tutorRole
 *      security:
 *          - bearerAuth: []
 *          # permit todo
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *            format: JWT
 *          required: true
 *      responses:
 *          '200':
 *              description: A JSON Array of pupils
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  firstname:
 *                                      type: string
 *                                  lastname:
 *                                      type: string
 *                                  token:
 *                                      type: string
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '404':
 *              description: No task was found
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.get('/pupils',authToken,permit("tutor"), TutorController.getPupils);


/**
 * @swagger
 * /add/pupil:
 *  post:
 *      summary: Add a pupil in the list of pupils that a tutor have
 *      tags:
 *          - tutorRole
 *      security:
 *          - bearerAuth: []
 *          # permit todo
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *            format: JWT
 *          required: true
 *      requestBody:
 *          description: the pupil that need to be added
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              format: CHAR(255)
 *                          password:
 *                              type: string
 *                              format: CHAR(255)
 *      responses:
 *          '200':
 *              description: relation has been added
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '5XX':
 *              description: Unexpected error.
 *
 *
 */
router.post('/add/pupil',authToken,permit("tutor"), TutorController.addPupil);

//router.patch('/test/sign/:id',TutorController.signTest);//todo
module.exports = router;