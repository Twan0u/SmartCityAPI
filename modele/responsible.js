module.exports.addResponsible = async (idTutor, idPupil, client) => {
    const {rows: id} = await client.query(`
        INSERT INTO Responsible(IdTutor,IdPupil)
        VALUES($1,$2)
        RETURNING id;`, [idTutor, idPupil]);
    return id;
}