/**
 * @swagger
 *  components:
 *   schemas:
 *      Test:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *                  format: CHAR(255)
 *              maxvalue:
 *                  type: string
 *                  format: integer
 *              result:
 *                  type: integer
 *              note:
 *                  type: string
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
 *              title: 'interrogation de grammaire'
 *              date: '2020-12-31'
 *              category: 'Géométrie'
 *              schoolsubject: 'Mathémathiques'
 */

module.exports.getTests = async (idClass, client) => {
    try {

        const {rows: tests} = await client.query(`
            SELECT test.id as id, test.title as title, test.maxvalue as maxvalue, TO_CHAR(test.date, 'YYYY-MM-DD') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
            FROM test
                LEFT JOIN SchoolSubjectSubCategory
            ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
                LEFT JOIN SchoolSubjectCategory
                ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE IdClass = $1
        `, [idClass]);

        return tests;

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function getTests';
    }
}

module.exports.getTodayTestsByClassId = async (idClass, client) => {
    try{

        const {rows: tests} = await client.query(`
            SELECT test.id as id, test.title as title, test.maxvalue as maxvalue, TO_CHAR(test.date, 'YYYY-MM-DD') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
            FROM test
                LEFT JOIN SchoolSubjectSubCategory
            ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
                LEFT JOIN SchoolSubjectCategory
                ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE IdClass = $1
              and date = current_date
        `, [idClass]);
        return tests;

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function getTodayTestsByClassId';
    }
}

module.exports.getWeekTestsByClassId = async (idClass, client) => {
    try {

        const {rows: tests} = await client.query(`
            SELECT test.id                           as id,
                   test.title                        as title,
                   test.maxvalue                     as maxvalue,
                   TO_CHAR(test.date, 'YYYY-MM-DD') as date,
                   SchoolSubjectSubCategory.name     as category,
                   SchoolSubjectCategory.name        as schoolsubject
            FROM test
                     LEFT JOIN SchoolSubjectSubCategory
                               ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
                     LEFT JOIN SchoolSubjectCategory
                               ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE IdClass = $1
              and (date between current_date and (current_date + '1 week':: interval))
        `, [idClass]);

        return tests;

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function getWeekTestsByClassId';
    }
}

module.exports.getUnsignedTests = async (idPupil, client) => {
    try{

        const {rows: tests} = await client.query(`
            SELECT test.id as idTest, test.title as title,TestResult.result as result , TestResult.note as note, test.maxvalue as maxvalue, TO_CHAR(test.date, 'YYYY-MM-DD') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
            FROM TestResult
                LEFT JOIN Test
            ON Test.id = TestResult.idTest
                LEFT JOIN SchoolSubjectSubCategory
                ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
                LEFT JOIN SchoolSubjectCategory
                ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE idPupil = $1 and SignedBy IS NULL
        `, [idPupil]);

        return tests;

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function getUnsignedTests';
    }
}

module.exports.addTest = async (title, maxValue, date, idSchoolSubjectSubCategory, idClass, client) => {
    try{

        const {rows: id} = await client.query(`
            INSERT INTO Test(title, maxValue, date, idSchoolSubjectSubCategory, idClass)
            VALUES ($1, $2, $3, $4, $5) RETURNING id;
            `, [title, maxValue, date, idSchoolSubjectSubCategory, idClass]);

        return id;

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function addTest';
    }
}

module.exports.signTest = async (idTutor, idTestResult, client) => {
    try{

        await client.query(`
            UPDATE testresult
            SET 
                 signedby = $1
            WHERE id = $2
            `, [idTutor,idTestResult]);

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function updateTest';
    }
}

module.exports.updateTest = async (id,title, maxValue, date, idSchoolSubjectSubCategory, idClass, client) => {
    try{

        await client.query(`
            UPDATE Test
            SET 
                title = $2,
                maxvalue = $3,
                date = $4,
                IdSchoolSubjectSubCategory = $5,
                idClass = $6
            WHERE id = $1
            `, [id,title, maxValue, date, idSchoolSubjectSubCategory, idClass]);

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function updateTest';
    }
}

module.exports.deleteTest = async (id,client) => {
    try{

        await client.query(`
            DELETE FROM testresult
            WHERE idtest =$1;
        `, [id]);

        await client.query(`
            DELETE FROM Test 
            WHERE id=$1;
            `, [id]);

    }catch (error){
        console.log(error);
        throw 'database error in modele/test function deleteTest';
    }
}