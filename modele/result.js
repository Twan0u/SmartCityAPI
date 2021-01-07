module.exports.getResult = async(idClass,idPupil,client) => {
    try{
        const {rows: results} = await client.query(`
            SELECT (sum(testresult.result)*100/sum(test.maxvalue)) as average, SchoolSubjectCategory.name as schoolsubject, SchoolSubjectSubCategory.name as category
            FROM testresult
                     LEFT JOIN test
                               ON test.id = testresult.idtest
                     LEFT JOIN SchoolSubjectSubCategory
                               ON SchoolSubjectSubCategory.id = test.idSchoolSubjectSubCategory
                     LEFT JOIN SchoolSubjectCategory
                               ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
            WHERE IdClass = $1 AND testResult.idpupil = $2
            Group By schoolsubject,category
        `, [idClass,idPupil]);

        return results;
    }catch(error){
        console.log(error);
        throw 'database error when tried getWeekTasksByClassId in model task';
    }
}