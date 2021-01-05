const pool = require("../modele/database");

const CategoryModel = require ("../modele/category");

module.exports.getCategories = async (req, res) => {

    const client = await pool.connect();

    try{

        let categories = await CategoryModel.getCategories(client);
        res.status(200).json(categories);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/classSubjectCategory with function getCategories")
        console.log(error);

    } finally {

        client.release();

    }
}