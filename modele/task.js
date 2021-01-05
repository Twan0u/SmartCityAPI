/**
 * @swagger
 *  components:
 *   schemas:
 *      Task:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *                  format: CHAR(255)
 *              type:
 *                  type: string
 *                  format: CHAR(255)
 *              date:
 *                  type: string
 *                  format: 'YYYY-MM-DD'
 *              category:
 *                  type: string
 *                  format: CHAR(255)
 *              schoolsubject:
 *                  type: string
 *                  format: CHAR(255)
 *          example:
 *              id: 18
 *              title: 'ramener argent photo de classe'
 *              date: '2020-12-31'
 *              category: 'Géométrie'
 *              schoolsubject: 'Mathémathiques'
 */

module.exports.getTasksByClassId = async (idClass, client) => {
    try{
        const {rows: tasks} = await client.query(`
            SELECT task.id as id,task.title as title,task.type as type, TO_CHAR(task.date, 'YYYY-MM-DD') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
            FROM task
            LEFT JOIN SchoolSubjectSubCategory
            ON SchoolSubjectSubCategory.id = task.idSchoolSubjectSubCategory
            LEFT JOIN SchoolSubjectCategory
            ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE idClass = $1
            `, [idClass]);
        return tasks;
    }catch(error){
        console.log(error);
        throw 'database error when tried getTasksByClassId in model task';
    }
}

module.exports.getCountTodayTasksByClassId = async (idClass, client) => {
    try{
        const {rows: count} = await client.query(`
            SELECT COUNT(task.id)
            FROM task
            WHERE IdClass = $1 AND date = current_date
        `, [idClass]);
        return count[0];
    }catch(error){
        console.log(error);
        throw 'database error when tried getCountTodayTasksByClassId in model task';
    }
}

module.exports.getTodayTasksByClassId = async (idClass, client) => {
    try{
        const {rows: tasks} = await client.query(`
            SELECT task.id as id,task.title as title,task.type as type, TO_CHAR(task.date, 'YYYY-MM-DD') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
            FROM task
            LEFT JOIN SchoolSubjectSubCategory
            ON SchoolSubjectSubCategory.id = task.idSchoolSubjectSubCategory
            LEFT JOIN SchoolSubjectCategory
            ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE IdClass = $1
                and date = current_date
        `, [idClass]);
        return tasks;
    }catch(error){
        console.log(error);
        throw 'database error when tried getTodayTasksByClassId in model task';
    }
}

module.exports.getWeekTasksByClassId = async (idClass, client) => {
    try{
        const {rows: tasks} = await client.query(`
            SELECT task.id as id, task.title as title, task.type as type, TO_CHAR(task.date, 'YYYY-MM-DD') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
            FROM task
                LEFT JOIN SchoolSubjectSubCategory
            ON SchoolSubjectSubCategory.id = task.idSchoolSubjectSubCategory
                LEFT JOIN SchoolSubjectCategory
                ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE IdClass = $1
              and (date between current_date  and (current_date + '1 week':: interval))
        `, [idClass]);

        return tasks;
    }catch(error){
        console.log(error);
        throw 'database error when tried getWeekTasksByClassId in model task';
    }

}

module.exports.postTask = async (title,type,date,idSubCat, idClass,client) => {
    try{
        const {rows: id} = await client.query(`
            INSERT INTO Task(title,type, date, idSchoolSubjectSubCategory, idClass)
            VALUES($1,$2,$3,$4,$5)
            RETURNING id;`, [title,type,date,idSubCat,idClass]);
        return id;
    }catch(error){
        console.log(error);
        throw 'database error when tried to post a task in model task';
    }
}

module.exports.updateTask = async (id,title,type,date,idSubCat,client) => {
    try{
        return await client.query(`
            UPDATE Task
            SET title = $2, type = $3, date = $4, idSchoolSubjectSubCategory = $5
            WHERE id = $1`, [id,title,type,date,idSubCat]);
    }catch(error){
        console.log(error);
        throw 'database error when tried to post a task in model task';
    }
}

module.exports.deleteTask = async (id,client) => {
    try {
        return await client.query(`
            DELETE
            FROM Task
            WHERE id = $1
        `, [id]);
    }catch(error){
        console.log(error);
        throw 'database error when tried to delete task in model task';
    }
}

