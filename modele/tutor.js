module.exports.loginTutor = async (username, client) => {
    try {

        const {rows: users} = await client.query(`
            SELECT * ,'tutor' as role 
            FROM Tutor 
            WHERE login = $1 LIMIT 1
        `, [username]);
        return users[0];

    }catch(error){

        console.log(error);
        throw 'database error in modele/tutor function loginTutor';

    }
}
module.exports.getPupils = async (id, client) => {
    try {

        const {rows: pupils} = await client.query(`
            select Pupil.id,
                   Pupil.login,
                   Pupil.firstname,
                   Pupil.lastname,
                   Pupil.birthdate,
                   Pupil.idclass,
                   'pupil' as role
            from Pupil
                     INNER JOIN Responsible ON Pupil.id = Responsible.idpupil
                     INNER JOIN Tutor ON Responsible.idTutor = Tutor.id
            where Tutor.id = $1
        `, [id]);
        return pupils;

    }catch(error){

        console.log(error);
        throw 'database error in modele/tutor function getPupils';

    }
}

module.exports.loginDoesExist = async (login, client) =>{
    try {

        const {rows: data} = await client.query(`
            select count(id)
            from tutor
            where login = $1
        `, [login]);
        return (data[0].count > 0);

    }catch(error){

        console.log(error);
        throw 'database error in modele/tutor function loginDoesExist';

    }
}

module.exports.add = async (login,password,firstname,lastname,phone,client) => {
    try {

        const {rows: user} = await client.query(`
            INSERT INTO Tutor(login, password, firstname, lastname, PhoneNumber)
            VALUES ($1, $2, $3, $4, $5);
        `, [login, password, firstname, lastname, phone]);
        return user;

    }catch(error){

        console.log(error);
        throw 'database error in modele/tutor function add';

    }
}

module.exports.signTest = async (idTest,idTutor,client) => {
    try {

        const {rows: user} = await client.query(`
            UPDATE TestResult
            SET signedby = $2
            WHERE id = $1;
        `, [idTest,idTutor]);
        return user;

    }catch(error){

        console.log(error);
        throw 'database error in modele/tutor function signTest';

    }
}
