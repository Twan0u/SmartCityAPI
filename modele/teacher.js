module.exports.getTeacherByID = async (id, client) => {
    try {

        const {rows: users} = await client.query(`
            SELECT login, firstname, lastname 
            FROM Teacher 
            WHERE ID = $1 LIMIT 1
            `, [id]);

        return users[0];

    }catch(error){
        console.log(error);
        throw 'database error when tried getTeacherByID in model teacher';
    }
}
module.exports.teacherLogin = async (username, client) => {
    try {

        const {rows: users} = await client.query(`
            SELECT *,'teacher' as role 
            FROM Teacher 
            WHERE login = $1 LIMIT 1
            `, [username]);

        return users[0];

    }catch(error){
        console.log(error);
        throw 'database error when tried teacherLogin in model teacher';
    }
}
/**
 * @swagger
 *  components:
 *   schemas:
 *      ClassTeacher:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  format: INTEGER
 *              login:
 *                  type: string
 *                  format: CHAR(255)
 *              firstname:
 *                  type: string
 *                  format: CHAR(255)
 *              lastname:
 *                  type: string
 *                  format: CHAR(255)
 *          example:
 *              id: 69
 *              firstname: 'Antoine'
 *              lastname: 'Lambert'
 */
module.exports.getClassTeacher = async (idClass, client) => {
    try{

        const {rows: classes} = await client.query(`
            SELECT ID, Login, FirstName, Lastname
            FROM Teacher 
            WHERE IdClass = $1
            `, [idClass]);

        return classes[0];

    }catch(error){
        console.log(error);
        throw 'database error when tried getClassTeacher in model teacher';
    }
}