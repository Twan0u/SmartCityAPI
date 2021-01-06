const pool = require("../modele/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const TutorModel = require("../modele/tutor");
const PupilModel = require("../modele/pupil");
const ResponsibleModel = require("../modele/responsible")

module.exports.getPupils = async (req, res) => {

    const client = await pool.connect();

    try{

        let pupils = await TutorModel.getPupils(req.user.id,client);

        let response = [];

        for(let i=0;i<pupils.length;i++){
            response[i] = {};
            response[i].firstname = pupils[i].firstname;
            response[i].lastname = pupils[i].lastname;
            response[i].token = jwt.sign(pupils[i], process.env.ACCESS_TOKEN_SECRET);
        }

        res.status(200).json(response);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tutor with function getPupils");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.addPupil = async (req, res) => {

    const client = await pool.connect();

    try{

        const pupil_username = req.body.username;
        const pupil_password = req.body.password;

        const idTutor = req.user.id;

        if (!pupil_username || !pupil_password){return res.sendStatus(400);}//bad request : nothing in body

        let already_inserted_pupils = await TutorModel.getPupils(req.user.id,client);

        for (let pupil of already_inserted_pupils) {
            if(pupil?.login===pupil_username){return res.sendStatus(409);}
        }

        let pupil = await PupilModel.loginPupil(pupil_username, client);

        if (pupil === undefined){ return res.sendStatus(404);} // pupil not found
        else{ //if pupil has been found
            if(await bcrypt.compare(pupil_password,pupil.password)){//if passwords match
                await ResponsibleModel.addResponsible(idTutor,pupil.id,client)
                return res.sendStatus(200);
            }else{
                return res.sendStatus(401);//if pupil password is wrong
            }
        }
    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tutor with function addPupil");
        console.log(error);

    } finally {

        client.release();

    }
}