const pool = require("../modele/database");
const TaskModel = require("../modele/task");

module.exports.getTasks = async (req, res) => {

    const client = await pool.connect();

    try{

        let tasks = await TaskModel.getTasksByClassId(req.user.idclass, client);
        res.status(200).json(tasks);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tasks with function getTasks");
        console.log(error);

    } finally {

        client.release();

    }
}
module.exports.getTodayTasks = async (req, res) => {

    const client = await pool.connect();

    try{

        let tasks = await TaskModel.getTodayTasksByClassId(req.user.idclass, client);
        res.status(200).json(tasks);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tasks with function getTodayTasks");
        console.log(error);

    } finally {

        client.release();

    }
}
module.exports.getWeekTasks = async (req, res) => {

    const client = await pool.connect();

    try{

        let tasks = await TaskModel.getWeekTasksByClassId(req.user.idclass, client);
        res.status(200).json(tasks);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tasks with function getWeekTasks");
        console.log(error);

    } finally {
        client.release();
    }
}


module.exports.postTask = async (req, res) => {

    const client = await pool.connect();

    try{

        const {title, type, date, idSchoolSubjectSubCategory} = req.body;

        //Check data from body
        if(!title||!date||!idSchoolSubjectSubCategory){return res.sendStatus(400);}//missing data for post

        await TaskModel.postTask(title, type, date, idSchoolSubjectSubCategory, req.user.idclass, client);
        res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tasks with function postTask");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.updateTask = async(req, res) => {

    const client = await pool.connect();

    try {

        const {title, type, date, idSchoolSubjectSubCategory} = req.body;

        if(!title||!type||!date||!idSchoolSubjectSubCategory){return res.sendStatus(400);}//missing data for post

        const id = parseInt(req.params.id);
        if(isNaN(id)){return res.sendStatus(400);}//check if param id exist and is a number

        await TaskModel.updateTask(id, title, type, date, idSchoolSubjectSubCategory, client);
        res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tasks with function updateTask");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.deleteTask = async (req, res) => {

    const client = await pool.connect();

    try{

        const id = parseInt(req.params.id);
        if(isNaN(id)){return res.sendStatus(400);}//check if param id exist and is a number

        await TaskModel.deleteTask(id,client);
        res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/tasks with function deleteTask");
        console.log(error);

    } finally {

        client.release();

    }
}