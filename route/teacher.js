const router = require("express").Router();

const TeacherController = require("../controleur/teacher");

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;

router.get('/:id',authToken,permit('teacher','pupil'),TeacherController.getTeacher);

module.exports = router;
