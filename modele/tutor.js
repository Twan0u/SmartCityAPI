module.exports.loginTutor = async (username, client) => {
    const {rows: users} = await client.query("SELECT * ,'tutor' as role FROM Tutor WHERE login = $1 LIMIT 1", [username]);
    return users[0];
}
module.exports.getPupils = async (id, client) => {
    const {rows: pupils} = await client.query(`

        select Pupil.id,Pupil.login,Pupil.firstname,Pupil.lastname,Pupil.birthdate,Pupil.idclass, 'pupil' as role
        from Pupil
        INNER JOIN Responsible ON Pupil.id = Responsible.idpupil
        INNER JOIN Tutor ON Responsible.idTutor = Tutor.id
        where Tutor.id = $1
        
        `, [id]);
    return pupils;
}

module.exports.add = async (username,password,firstname,lastname,phonenumber,client) => {
    const {rows: user} = await client.query(`
        INSERT INTO Tutor(username,password,firstname,lastname,phonenumber)
        VALUES($1,$2);`, [username,password,firstname,lastname,phonenumber]);
    return user;
}
