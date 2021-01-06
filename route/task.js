const TaskController = require("../controleur/task");
const router = require("express").Router();

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;

/**
 * @swagger
 * /tasks:
 *  get:
 *      summary: Returns all the task of class in which the user is a part of.
 *      tags:
 *          - task
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
 *              description: A JSON Array of tasks
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Task'
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
router.get('/',authToken,permit("teacher","pupil"), TaskController.getTasks);
/**
 * @swagger
 * /tasks/today:
 *  get:
 *      summary: Returns all the task for the class for today
 *      tags:
 *          - task
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
 *              description: A JSON Array of tasks
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Task'
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
router.get('/today',authToken,permit("teacher","pupil"), TaskController.getTodayTasks);
/**
 * @swagger
 * /tasks/week:
 *  get:
 *      summary: Returns all the task due for the class from tomorrow to the end of the week
 *      tags:
 *          - task
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
 *              description: A JSON Array of tasks
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Task'
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
router.get('/week',authToken,permit("teacher","pupil"), TaskController.getWeekTasks);


/**
 * @swagger
 *  components:
 *   schemas:
 *      TaskInput:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  format: CHAR(255)
 *              type:
 *                  type: string
 *                  format: CHAR(255)
 *              date:
 *                  type: string
 *                  format: 'DDD MMM YYY'
 *              idSchoolSubjectSubCategory:
 *                  type: int
 *          example:
 *              title: 'ramener argent photo de classe'
 *              date: '2020-11-30'
 *              type: 'Devoir'
 *              idSchoolSubjectSubCategory: 2
 *          required:
 *              - title
 *              - date
 *              - idSchoolSubjectSubCategory
 */

/**
 * @swagger
 * /tasks:
 *  post:
 *      summary: add a new task
 *      tags:
 *          - teacherRole
 *          - task
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
 *          description: the task to add in db
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskInput'
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
router.post('/',authToken,permit("teacher"), TaskController.postTask);
/**
 * @swagger
 * /tasks/id/update:
 *  post:
 *      summary: modify a task
 *      tags:
 *          - task
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
 *          description: the task to modify
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskInput'
 *      responses:
 *          '200':
 *              description: Object has been added
 *          '400':
 *              description: body of request or id in url is invalid
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
router.post('/:id/update',authToken,permit("teacher"), TaskController.updateTask);
/**
 * @swagger
 * /tasks/id/delete:
 *  get:
 *      summary: Delete a task
 *      tags:
 *          - task
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
router.get('/:id/delete',authToken,permit("teacher"), TaskController.deleteTask);

module.exports = router;