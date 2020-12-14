const ResultControleur = require("../controleur/result");
const router = require("express").Router();

router.get('/:id', ResultControleur.getResult);
router.post('/', ResultControleur.postResult);
router.patch('/', ResultControleur.updateResult);
router.delete('/', ResultControleur.deleteResult);

module.exports = router;