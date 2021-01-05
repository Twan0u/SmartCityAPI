module.exports.addResponsible = async (idTutor, idPupil, client) => {
    try {
        await client.query(`
            INSERT INTO Responsible(IdTutor, IdPupil)
            VALUES ($1, $2);
            `, [idTutor, idPupil]);
    }catch(error){
        console.log(error);
        throw 'database error when tried to addResponsible in model/responsible';
    }
}