const bcrypt = require('bcrypt');
require('dotenv').config();

let pool = require ("../modele/database");
let TutorDB = require ("../modele/tutor");

module.exports.signUp = async (req, res) => {
    const client = await pool.connect();

    const username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phoneNumber = req.body.phone;

    if (!username || !password || !firstname || !lastname ){return res.sendStatus(400);}//bad request

    try{
        password = bcrypt.hash(password);
        await TutorDB.add(username,password,firstname,lastname,phoneNumber, client);
    } catch (error){
        return res.sendStatus(500);
    } finally {
        client.release();
    }
};
