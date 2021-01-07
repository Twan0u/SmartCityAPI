const ResultController = require("../controleur/result");
const router = require("express").Router();

router.get('/', ResultController.getResult);
//router.post('/', ResultControleur.postResult);
//router.patch('/', ResultControleur.updateResult);
//router.delete('/', ResultControleur.deleteResult);

module.exports = router;