const pool = require("../modele/database");
const TestModel = require("../modele/test");

module.exports.getTests = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass;
    try{
        let tests = await TestModel.getTests(idClass, client);
        if(tests !== undefined){
            res.status(200).json(tests);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getTodayTests = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass
    try{
        let tests = await TestModel.getTodayTestsByClassId(idClass, client);
        if(tests !== undefined){
            res.status(200).json(tests);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getWeekTests = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass;
    try{
        let tests = await TestModel.getWeekTestsByClassId(idClass, client);
        if(tests !== undefined){
            res.status(200).json(tests);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.addTest = async (req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass;
    const {title, maxValue, date, idSchoolSubjectSubCategory} = req.body;
    try{
        await TestModel.addTest(title, maxValue, date, idSchoolSubjectSubCategory, idClass, client);
        res.sendStatus(200);
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


module.exports.updateTest = async(req, res) => {
    const client = await pool.connect();
    const idClass = req.user.idclass;
    const idTestText = req.params.id; //attention ! Il s'agit de texte !

    const {title, maxValue, date, idSchoolSubjectSubCategory} = req.body;

    const idTest = parseInt(idTestText);
    if(isNaN(idTest)){
        res.sendStatus(400);
    } else {
        const response = TestModel.updateTest(idTest, title, maxValue, date, idSchoolSubjectSubCategory, idClass,client);
        if(response){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports.deleteTest = async (req, res) => {
    const client = await pool.connect();
    const idTestText = req.params.id; //attention ! Il s'agit de texte !
    const idTest = parseInt(idTestText);
    if(isNaN(idTest)){
        res.sendStatus(400);
    } else {
        const response = TestModel.deleteTest(idTest,client);
        if(response){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports.getUnsigned = async (req, res) => {
    const client = await pool.connect();
    const idPupil = req.user.id;
    try{
        const response = TestModel.getUnsignedTests(idPupil, client);
        if(response){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
