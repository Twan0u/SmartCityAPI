/**
 * @swagger
 *  components:
 *   schemas:
 *      Class:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  format: INTEGER
 *              classname:
 *                  type: string
 *                  format: CHAR(255)
 *          example:
 *              id: 42
 *              classname: '2B'
 */
module.exports.getClass = async (idClass, client) => {
    try {

        const {rows: classes} = await client.query(`
            SELECT ID, CONCAT(Year, Letter) AS classname
            FROM Class
            WHERE ID = $1
            `, [idClass]);

        return classes[0];

    }catch (error){
        console.log(error);
        throw 'database error in modele/class function getClass';
    }
}

