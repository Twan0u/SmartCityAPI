const ResultController = require("../controleur/result");
const router = require("express").Router();

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;

router.get('/average',authToken,permit("pupil"), ResultController.getResult);
//router.post('/', ResultControleur.postResult);
//router.patch('/', ResultControleur.updateResult);
//router.delete('/', ResultControleur.deleteResult);

module.exports = router;