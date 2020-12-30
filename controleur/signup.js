const bcrypt = require('bcrypt');
require('dotenv').config();

let pool = require ("../modele/database");
let TutorDB = require ("../modele/tutor");

module.exports.signUp = async (req, res) => {
    const client = await pool.connect();

    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phoneNumber = req.body.phone;

    if (!username || !password || !firstname || !lastname ){return res.sendStatus(400);}//bad request

    try{
        if(await TutorDB.loginDoesExist(username, client)){return res.sendStatus(401);}//user already exists
        const hashedPassword = await bcrypt.hash(password,10);
        await TutorDB.add(username,hashedPassword,firstname,lastname,phoneNumber, client);
        return res.sendStatus(200);
    } catch (error){
        console.log(error);
        return res.sendStatus(500);
    } finally {
        client.release();
    }
};
