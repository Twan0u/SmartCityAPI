const pool = require("../modele/database");

const CategoryModel = require ("../modele/category");

module.exports.getCategories = async (req, res) => {
    const client = await pool.connect();
    try{
        let categories = await CategoryModel.getCategories(client);
        if(categories !== undefined){
            res.status(200).json(categories);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}