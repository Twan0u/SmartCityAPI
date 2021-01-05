/**
 * @swagger
 *  components:
 *   schemas:
 *      Pupil:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: INTEGER
 *                  firstname:
 *                      type: string
 *                      format: CHAR(255)
 *                  lastname:
 *                      type: string
 *                      format: CHAR(255)
 *                  birthdate:
 *                      type: string
 *                      format: date
 *
 *          example:
 *            - id: 420
 *              firstname: 'Thomas'
 *              lastname: 'Martin'
 *              birthdate: '????'
 *            - id: 69
 *              firstname: 'Bob'
 *              lastname: 'Dubuisson'
 *              birthdate: '????'
 */
module.exports.getPupil = async (id, client) => {
    try{

    const {rows: users} = await client.query(`
        SELECT ID, FirstName, LastName, Birthdate 
        FROM Pupil 
        WHERE ID = $1 LIMIT 1
        `, [id]);

    return users[0];

    }catch(error){
        console.log(error);
        throw 'database error when tried to getPupil in model/pupil';
    }

}

module.exports.loginPupil = async (username, client) => {
    try{

        const {rows: users} = await client.query(`
            SELECT *,'pupil' as role 
            FROM Pupil 
            WHERE login = $1 LIMIT 1
            `, [username]);

        return users[0];

    }catch(error){
        console.log(error);
        throw 'database error when tried to loginPupil in model/pupil';
    }
}

module.exports.getPupilsByClass = async (idClass, client) => {
    try{

        const {rows: pupils} = await client.query(`
            SELECT id, firstname, lastname, TO_CHAR(birthdate, 'DD Mon YYYY') as birthdate
            FROM Pupil
            WHERE idClass = $1
            `, [idClass]);

        return pupils;

    }catch(error){
        console.log(error);
        throw 'database error when tried to getPupilsByClass in model/pupil';
    }
}