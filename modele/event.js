/**
 * @swagger
 *  components:
 *   schemas:
 *      Event:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *                  format: CHAR(255)
 *              description:
 *                  type: string
 *                  format: CHAR(255)
 *              date:
 *                  type: string
 *                  format: 'YYYY-MM-DD'
 *          example:
 *              id: 32
 *              name: 'Sortie au musée'
 *              description: 'Ne pas oublier son masque'
 *              date: '2020-11-31'
 */

module.exports.getEvents = async (idClass, client) => {
    try{
        const {rows: events} = await client.query(`
            SELECT id, name, TO_CHAR(date, 'YYYY-MM-DD') as date, description 
            FROM Event 
            WHERE idclass = $1
            `, [idClass]);
        return events;
    }catch(error){
        console.log(error);
        throw 'database error when tried to get all events in model event';
    }
}

module.exports.getTodayEventsByClassId = async (idClass, client) => {
    try{
        const {rows: events} = await client.query(`
            SELECT id,name,description, TO_CHAR(date, 'YYYY-MM-DD') as date
            FROM event
            WHERE idClass = $1
              and date = current_date
            `, [idClass]);
        return events;
    }catch(error){
        console.log(error);
        throw 'database error when tried to get the events of today in model event';
    }
}

module.exports.getCountWeekEventsByClassId= async (idClass, client) => {
    try{
        const {rows: events} = await client.query(`
            SELECT COUNT(id)
            FROM Event
            WHERE idClass = $1
              and (date between current_date and (current_date + '1 week':: interval))
              `, [idClass]);
        return events;
    }catch(error){
        console.log(error);
        throw 'database error when tried to get the number of events in a week in model event';
    }
}

module.exports.getWeekEventsByClassId = async (idClass, client) => {
    try{
        const {rows: events} = await client.query(`
            SELECT id,name,description, TO_CHAR(date, 'YYYY-MM-DD') as date
            FROM event
            WHERE IdClass = $1
              and (date between current_date  and (current_date + '1 week':: interval))
            `, [idClass]);
        return events;
    }catch(error){
        console.log(error);
        throw 'database error when tried to get events by week in model event';
    }
}

module.exports.postEvent = async (name, date, description, idClass, client) => {
    try {
        await client.query(`
            INSERT INTO Event(name, date, description, idClass)
            VALUES ($1, $2, $3, $4);
        `, [name, date, description, idClass]);
    }catch(error){
        console.log(error);
        throw 'database error when tried to post event in model event';
    }
}

module.exports.updateEvent = async (id, name, date, description, client) => {
    try {
        await client.query(`
            UPDATE event
            SET name = $2,
                date = $3,
                description = $4
            WHERE id = $1;
        `, [id, name, date, description]);
    }catch(error){
        console.log(error);
        throw 'database error when tried to update event in model event';
    }
}

module.exports.deleteEvent = async (id,client ) => {
    try {
        await client.query(`
            DELETE 
            FROM Event 
            WHERE id=$1
            `, [id]);
    }catch(error){
        console.log(error);
        throw 'database error when tried to delete event in model event';
    }
}