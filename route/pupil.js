const PupilControleur = require("../controleur/pupil");
const router = require("express").Router();

router.get('/:id', PupilControleur.getPupil);//accède aux données de un élève en particulier

module.exports = router;