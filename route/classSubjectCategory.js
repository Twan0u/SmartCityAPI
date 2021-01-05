const router = require("express").Router();

const ClassSubjectController = require("../controleur/classSubjectCategory");

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;

/**
 * @swagger
 * /classsubjectcategories:
 *  get:
 *      summary: Returns the class subject categories at this school
 *      tags:
 *          - school_subject_category
 *          - pupilRole
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
 *              description: A JSON Object of a Categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Categories'
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
router.get('/',authToken,permit("teacher","pupil"), ClassSubjectController.getCategories);

module.exports = router;