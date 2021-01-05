const bcrypt = require('bcrypt');
require('dotenv').config();

let pool = require ("../modele/database");
let TutorDB = require ("../modele/tutor");

module.exports.signUp = async (req, res) => {

    const client = await pool.connect();

    try{

        const username = req.body.username;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const phoneNumber = req.body.phone;

        //Check if all mandatory data exist in request
        if (!username || !password || !firstname || !lastname ){return res.sendStatus(400);}

        //Check if the user does not already exists in database
        if(await TutorDB.loginDoesExist(username, client)){return res.sendStatus(409);}

        const hashedPassword = await bcrypt.hash(password,10);

        await TutorDB.add(username,hashedPassword,firstname,lastname,phoneNumber, client);
        return res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/signup with function signUp")
        console.log(error);

    } finally {

        client.release();

    }
};
