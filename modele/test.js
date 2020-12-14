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
 *                  format: 'DDD MMM YYY'
 *              category:
 *                  type: string
 *                  format: CHAR(255)
 *              schoolsubject:
 *                  type: string
 *                  format: CHAR(255)
 *          example:
 *              id: 18
 *              title: 'interrogation de grammaire'
 *              date: '25 Nov 2020'
 *              category: 'Géométrie'
 *              schoolsubject: 'Mathémathiques'
 */

module.exports.getTests = async (idClass, client) => {
    const {rows: tests} = await client.query(`
        SELECT test.id as id, test.title as title, test.maxvalue as maxvalue, TO_CHAR(test.date, 'DD Mon YYYY') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
        FROM test
            LEFT JOIN SchoolSubjectSubCategory
        ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
            LEFT JOIN SchoolSubjectCategory
            ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
        WHERE IdClass = $1
    `, [idClass]);
    return tests;
}

module.exports.getTodayTestsByClassId = async (idClass, client) => {
    const {rows: tests} = await client.query(`
        SELECT test.id as id, test.title as title, test.maxvalue as maxvalue, TO_CHAR(test.date, 'DD Mon YYYY') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
        FROM test
            LEFT JOIN SchoolSubjectSubCategory
        ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
            LEFT JOIN SchoolSubjectCategory
            ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
        WHERE IdClass = $1
          and date = current_date
    `, [idClass]);
    return tests;
}

module.exports.getWeekTestsByClassId = async (idClass, client) => {
    const {rows: tests} = await client.query(`
        SELECT test.id as id, test.title as title, test.maxvalue as maxvalue, TO_CHAR(test.date, 'DD Mon YYYY') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
        FROM test
        LEFT JOIN SchoolSubjectSubCategory
        ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
        LEFT JOIN SchoolSubjectCategory
        ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
        WHERE IdClass = $1
          and (date between current_date and (current_date + '1 week':: interval))
    `, [idClass]);
    return tests;
}

module.exports.getUnsignedTests = async (idPupil, client) => {
    const {rows: tests} = await client.query(`
        SELECT test.id as idTest, test.title as title,TestResult.result as result , TestResult.note as note, test.maxvalue as maxvalue, TO_CHAR(test.date, 'DD Mon YYYY') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
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
}

module.exports.addTest = async (title, maxValue, date, idSchoolSubjectSubCategory, idClass, client) => {
    const {rows: id} = await client.query(`
        INSERT INTO Test(title, maxValue, date, idSchoolSubjectSubCategory, idClass)
        VALUES ($1, $2, $3, $4, $5) RETURNING id;`, [title, maxValue, date, idSchoolSubjectSubCategory, idClass]);
    return id;
}

module.exports.updateTest = async (id,title, maxValue, date, idSchoolSubjectSubCategory, idClass, client) => {
    const query =  `UPDATE Test
        SET 
            title = $2
            maxvalue = $3
            date = $4
            IdSchoolSubjectSubCategory = $5
            idClass = $6
        WHERE id = $1`;
    return await client.query(query, [id,title, maxValue, date, idSchoolSubjectSubCategory, idClass]);
}
module.exports.deleteTest = async (id,client) => {
    return await client.query("DELETE FROM Test WHERE id=$1", [id]);
}