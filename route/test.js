const TestController = require("../controleur/test");
const router = require("express").Router();

/**
 * @swagger
 * /tests:
 *  get:
 *      summary: Returns all the tests of class in which the user is a part of.
 *      tags:
 *          - test
 *          - teacherRole
 *          - pupilRole
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
 *              description: A JSON Array of tests
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Test'
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
router.get('/',authToken,permit("teacher","pupil"), TestController.getTests);

/**
 * @swagger
 * /tests/unsigned:
 *  get:
 *      summary: Returns all the tests that are not signed by the user
 *      tags:
 *          - test
 *          - pupilRole
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
 *              description: A JSON Array of tests
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Test'
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
router.get('/unsigned',authToken,permit("pupil"), TestController.getUnsigned);

/**
 * @swagger
 * /tests/today:
 *  get:
 *      summary: Returns all the tests of that user for today
 *      tags:
 *          - test
 *          - pupilRole
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
 *              description: A JSON Array of tests
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Test'
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
router.get('/today',authToken,permit("teacher","pupil"), TestController.getTodayTests);

/**
 * @swagger
 * /tests/week:
 *  get:
 *      summary: Returns all the tests of that user for the week (start from tomorrow)
 *      tags:
 *          - test
 *          - pupilRole
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
 *              description: A JSON Array of tests
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Test'
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
router.get('/week',authToken,permit("teacher","pupil"), TestController.getWeekTests);

/**
 * @swagger
 *  components:
 *   schemas:
 *      TestInput:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  format: CHAR(255)
 *              maxvalue:
 *                  type: integer
 *              date:
 *                  type: string
 *                  format: 'DDD MMM YYY'
 *              idSchoolSubjectSubCategory:
 *                  type: int
 */

/**
 * @swagger
 * /tests:
 *  post:
 *      summary: add a new test
 *      tags:
 *          - teacherRole
 *          - test
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
 *          description: the test to add in db
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TestInput'
 *      responses:
 *          '200':
 *              description: Object has been added
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.post('/',authToken,permit("teacher"), TestController.addTest);

/**
 * @swagger
 * /tests/id:
 *  patch:
 *      summary: modify a test
 *      tags:
 *          - test
 *          - teacherRole
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
 *          description: the test to modify
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TestInput'
 *      responses:
 *          '200':
 *              description: Object has been added
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.patch('/:id',authToken,permit("teacher"), TestController.updateTest);

/**
 * @swagger
 * /tests/id:
 *  delete:
 *      summary: Delete a test
 *      tags:
 *          - test
 *          - teacherRole
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
 *              description: Object has been deleted
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.delete('/:id',authToken,permit("teacher"), TestController.deleteTest);

module.exports = router;
