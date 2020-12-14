const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

let pool = require ("../modele/database");
let teacherDB = require ("../modele/teacher");
let studentDB = require ("../modele/pupil");
let TutorDB = require ("../modele/tutor");

module.exports.getToken = async (req, res) => {
    const client = await pool.connect();

    const username = req.body.username;
    const password = req.body.password;

    let user = undefined;

    if (!username || !password){return res.sendStatus(400);}//bad request : nothing in body

    try{
        user = await studentDB.loginPupil(username, client);

        if(user === undefined){
            user = await teacherDB.teacherLogin(username, client);
        }
        if(user === undefined){
            user = await TutorDB.loginTutor(username, client);
        }
    } catch (error){
        return res.sendStatus(500);
    } finally {
        client.release();
    }

   if(user === undefined) {//if no user with that login
       return res.sendStatus(404);
   }else{
       if(await bcrypt.compare(password,user.password)){
           delete user.password;//prevent password to be passed in the jwt
           const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: process.env.ACCESS_TOKEN_TIMEOUT });//todo on à retiré le expire pour le dev
           //const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
           res.json(accessToken);
           delete user.password;
       }else{
           return res.sendStatus(401);//if code is wrong
       }
   }
};

/*
select login,password,firstname,lastname,idclass, 'teacher' as role from teacher
union
select login,password,firstname,lastname,idclass, 'pupil' as role from pupil
union
select login,password,firstname,lastname,null as idclass, 'tutor' as role  from tutor
* */