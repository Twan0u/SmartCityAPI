const pool = require("../modele/database");
const TestModel = require("../modele/test");

module.exports.getTests = async (req, res) => {

    const client = await pool.connect();

    try{

        let tests = await TestModel.getTests(req.user.idclass, client);
        res.status(200).json(tests);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function getTests");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.getTodayTests = async (req, res) => {

    const client = await pool.connect();

    try{

        let tests = await TestModel.getTodayTestsByClassId(req.user.idclass, client);
        res.status(200).json(tests);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function getTodayTests");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.getWeekTests = async (req, res) => {

    const client = await pool.connect();

    try{

        let tests = await TestModel.getWeekTestsByClassId(req.user.idclass, client);
        res.status(200).json(tests);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function getWeekTests");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.addTest = async (req, res) => {

    const client = await pool.connect();

    try{

        const {title, maxvalue, date, idSchoolSubjectSubCategory} = req.body;

        if(!title||!maxvalue||!date||!idSchoolSubjectSubCategory){return res.sendStatus(400);}//missing data for post

        await TestModel.addTest(title, maxvalue, date, idSchoolSubjectSubCategory, req.user.idclass, client);
        res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function addTest");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.updateTest = async(req, res) => {

    const client = await pool.connect();

    try{

    const {title, maxvalue, date, idSchoolSubjectSubCategory} = req.body;
    if(!title||!maxvalue||!date||!idSchoolSubjectSubCategory){return res.sendStatus(400);}//missing data for post

    const id = parseInt(req.params.id);
    if(isNaN(id)){return res.sendStatus(400);}//check if param id exist and is a number

    await TestModel.updateTest(id, title, maxvalue, date, idSchoolSubjectSubCategory, req.user.idclass, client);
    res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function updateTest");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.deleteTest = async (req, res) => {

    const client = await pool.connect();

    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)){return res.sendStatus(400);}//check if param id exist and is a number

        await TestModel.deleteTest(id,client);
        res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function deleteTest");
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.getUnsigned = async (req, res) => {

    const client = await pool.connect();

    try{

        const response = await TestModel.getUnsignedTests(req.user.id, client);
        res.status(200).json(response);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function getUnsigned");
        console.log(error);

    } finally {

        client.release();

    }
}
module.exports.getUnsignedCount = async (req, res) => {

    const client = await pool.connect();

    try{

        const response = await TestModel.getUnsignedTests(req.user.id, client);
        res.status(200).json(response?.length);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/test with function getUnsigned");
        console.log(error);

    } finally {

        client.release();

    }
}