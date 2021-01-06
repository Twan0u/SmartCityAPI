const TestController = require("../controleur/test");
const router = require("express").Router();

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;

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
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
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
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 *
 */
router.get('/unsigned',authToken,permit("pupil"), TestController.getUnsigned);

/**
 * @swagger
 * /tests/unsigned/count:
 *  get:
 *      summary: Returns the number of tests that are not signed by the user
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
 *              description: the number of unsigned tests
 *          '401':
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 *
 */
router.get('/unsigned/count',authToken,permit("pupil"), TestController.getUnsignedCount);

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
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
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
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
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
 *          example:
 *              title: 'verbes en -er'
 *              maxvalue: 20
 *              date: '2020-11-30'
 *              idSchoolSubjectSubCategory: 1
 *          required:
 *              - title
 *              - maxvalue
 *              - date
 *              - idSchoolSubjectSubCategory
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
 *          '400':
 *              description: body of request is invalid
 *          '401':
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
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
 *          '400':
 *              description: body if request is invalid or id in url path is invalid
 *          '401':
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
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
 *          '400':
 *              description: id in url path is invalid
 *          '401':
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 *
 */
router.delete('/:id',authToken,permit("teacher"), TestController.deleteTest);

module.exports = router;
