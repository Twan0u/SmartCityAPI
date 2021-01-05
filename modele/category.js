/**
 * @swagger
 *  components:
 *   schemas:
 *      Categories:
 *          type: object
 *          properties:
 *              idsubcategory:
 *                  type: integer
 *              category:
 *                  type: string
 *              idcategory:
 *                  type: integer
 *              schoolsubject:
 *                  type: string
 *          example:
 *              idsubcategory: 5
 *              category: "dessin"
 *              idcategory: 4
 *              schoolsubject: "autres"
 */
module.exports.getCategories = async (client) => {
    try {
        const {rows: categories} = await client.query(`
            SELECT SchoolSubjectSubCategory.id   as idsubcategory,
                   SchoolSubjectSubCategory.name as category,
                   SchoolSubjectCategory.id      as idcategory,
                   SchoolSubjectCategory.name    as schoolsubject
            FROM SchoolSubjectSubCategory
                     LEFT JOIN SchoolSubjectCategory
                               ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
        `);
        return categories;
    }catch(error){
        console.log(error);
        throw 'database error in modele/category function getCategories';
    }
}