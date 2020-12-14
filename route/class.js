const router = require("express").Router();

const ClassController = require("../controleur/class");
const TeacherController = require("../controleur/teacher");
const PupilController = require("../controleur/pupil");


const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;

/**
 * @swagger
 * /class:
 *  get:
 *      summary: Returns the class in which the user is a teacher or a student.
 *      tags:
 *          - class
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
 *              description: A JSON Object of a Class
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Class'
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '404':
 *              description: Class of the user not found
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.get('/',authToken,permit("teacher","pupil"), ClassController.getClass);

/**
 * @swagger
 * /class/teacher:
 *  get:
 *      summary: Returns the class teacher
 *      tags:
 *          - class
 *          - teacher
 *      security:
 *          - bearerAuth: []
 *          #permit todo
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *            format: JWT
 *          required: true
 *      responses:
 *          '200':
 *              description: A JSON Object of a Class
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ClassTeacher'
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '404':
 *              description: Class of the user not found
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.get('/teacher',authToken,permit("teacher","pupil"), TeacherController.getClassTeacher);

/**
 * @swagger
 * /class/pupils:
 *  get:
 *      summary: Returns the pupils in the class
 *      tags:
 *          - class
 *          - pupils
 *      security:
 *          - bearerAuth: []
 *          #permit todo
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *            format: JWT
 *          required: true
 *      responses:
 *          '200':
 *              description: A JSON Object of a Class
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Pupil'
 *          '401':
 *              description: Authorization information is missing or invalid.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '404':
 *              description: Class of the user not found
 *          '5XX':
 *              description: Unexpected error.
 *
 */
router.get('/pupils',authToken,permit("teacher"), PupilController.getPupilsInClass);


module.exports = router;