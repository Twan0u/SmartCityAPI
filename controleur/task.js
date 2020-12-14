const pool = require("../modele/database");
const TaskModel = require("../modele/task");

module.exports.getTasks = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass
    try{
        let tasks = await TaskModel.getTasksByClassId(idClass, client);
        if(tasks !== undefined){
            res.status(200).json(tasks);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
module.exports.getTodayTasks = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass
    try{
        let tasks = await TaskModel.getTodayTasksByClassId(idClass, client);
        if(tasks !== undefined){
            res.status(200).json(tasks);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
module.exports.getWeekTasks = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass
    try{
        let tasks = await TaskModel.getWeekTasksByClassId(idClass, client);
        if(tasks !== undefined){
            res.status(200).json(tasks);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.postTask = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass
    const {title, type, date, idSchoolSubjectSubCategory} = req.body;
    try{
        await TaskModel.postTask(title, type, date, idSchoolSubjectSubCategory, idClass, client);
        res.sendStatus(200);
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.updateTask = async(req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass;
    const {title, type, date, idSchoolSubjectSubCategory} = req.body;
    const idText = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idText);
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        const response = TaskModel.updateTask(id, title, type, date, idSchoolSubjectSubCategory, idClass,client);
        if(response){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports.deleteTask = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        const response = TaskModel.deleteTask(id,client);
        if(response){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}