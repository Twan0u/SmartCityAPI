const pool = require("../modele/database");

const ResultModel = require("../modele/result");

module.exports.getResult = async (req, res) => {

    const client = await pool.connect();

    try{
       /* let result = [
            {"title":"Francais",
            "average":12,
            "subcat":[
                {"title":"Grammaire",
                "average":10},
                {"title":"Conjugaison",
                    "average":14}
            ]},
            {"title":"Math",
                "average":10,
                "subcat":[
                    {"title":"Géométrie",
                        "average":10},
                ]}
        ];*/
        const result = await ResultModel.getResult(req.user.idclass,req.user.id,client);
        res.json(result);

    } catch (error){

        console.log(error);
        res.sendStatus(500);

    } finally {

        client.release();

    }

}

/*module.exports.postResult = (req, res) => {//todo
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
}*/