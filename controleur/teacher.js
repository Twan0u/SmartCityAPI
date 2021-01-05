const pool = require("../modele/database");
const TeacherModel = require("../modele/teacher");

module.exports.getTeacher = async (req, res) => {

    const client = await pool.connect();

    try{

        const id = parseInt(req.params.id);
        if(isNaN(id)){return res.sendStatus(400);}//check if param id exist and is a number

        const teacher = await TeacherModel.getTeacherByID(id, client);
        res.status(200).json(teacher);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/teacher with function getTeacher");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.getClassTeacher = async (req, res) => {

    const client = await pool.connect();

    try{

        let teacher = await TeacherModel.getClassTeacher(req.user.idclass, client);
        res.status(200).json(teacher);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/teacher with function getClassTeacher");
        console.log(error);

    } finally {

        client.release();

    }
}