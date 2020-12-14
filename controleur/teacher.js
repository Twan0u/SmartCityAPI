const pool = require("../modele/database");
const TeacherModel = require("../modele/teacher");

module.exports.getTeacher = async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id;
    try{
            const teacher = await TeacherModel.getTeacherByID(id, client);
            if(teacher !== undefined){
                res.status(200).json(teacher);
            } else {
                res.sendStatus(404);
            }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getClassTeacher = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass
    try{
        let teacher = await TeacherModel.getClassTeacher(idClass, client);
        if(teacher !== undefined){
            res.status(200).json(teacher);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}