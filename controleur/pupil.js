const pool = require("../modele/database");
const PupilModel = require("../modele/pupil");

module.exports.getPupil = async (req, res) => {

    const client = await pool.connect();

    try{

        const id = parseInt(req.params.id);
        if(isNaN(id)){return res.sendStatus(400);}//check if param id exist and is a number

        const pupil = await PupilModel.getPupil(id, client);

        if(pupil !== undefined){
            res.status(200).json(pupil);
        } else {
            res.sendStatus(404);
        }

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/pupil with function getPupil")
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.getPupilsInClass = async (req, res) => {

    const client = await pool.connect();

    try{

        let pupils = await PupilModel.getPupilsByClass(req.user.idclass, client);

            res.status(200).json(pupils);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/pupil with function getPupilsInClass")
        console.log(error);

    } finally {

        client.release();

    }
}