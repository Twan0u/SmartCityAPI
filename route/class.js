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
 *          - pupilRole
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
 *              description: A JSON Object of a Class
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Class'
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
router.get('/',authToken,permit("teacher","pupil"), ClassController.getClass);

/**
 * @swagger
 * /class/teacher:
 *  get:
 *      summary: Returns the class teacher
 *      tags:
 *          - class
 *          - teacherRole
 *          - pupilRole
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
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
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
 *          - teacherRole
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
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 *
 */
router.get('/pupils',authToken,permit("teacher"), PupilController.getPupilsInClass);


module.exports = router;