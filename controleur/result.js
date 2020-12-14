const ResultModele = require("../modele/result");

module.exports.getResult = (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        try{
            const result = ResultModele.getResult(id);
            res.json(result);
        } catch (error){
            res.sendStatus(404);
        }
    }
}

module.exports.postResult = (req, res) => {//todo
    const body = req.body;
    const {id, nom, prix} = body;//todo
    const response = ResultModele.postResult(id, nom, prix);//todo
    if(response){
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
}

module.exports.updateResult = (req, res) => {//todo
    const {id, prix} = req.body;//todo
    const response = ResultModele.updateResult(id, prix);//todo
    if(response){
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.deleteResult = (req, res) => {//todo
    const {id} = req.body;
    const response = ResultModele.deleteResult(id);
    if(response){
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}