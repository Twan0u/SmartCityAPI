const pool = require("../modele/database");
const ClassModel = require ("../modele/class");


module.exports.getClass = async (req, res) => {

    const client = await pool.connect();

    try{

        const classes = await ClassModel.getClass(req.user.idclass, client);
        res.status(200).json(classes);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/class with function getClass");
        console.log(error);

    } finally {

        client.release();

    }
}