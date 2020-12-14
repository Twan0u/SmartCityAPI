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
 *                  format: 'DDD MMM YYY'
 *          example:
 *              id: 32
 *              name: 'Sortie au musée'
 *              description: 'Ne pas oublier son masque'
 *              date: '22 Dec 2020'
 */
module.exports.getEvents = async (idClass, client) => {
    const {rows: events} = await client.query("SELECT id, Name, date, description FROM Event WHERE ID = $1", [idClass]);
    return events;
}

module.exports.getTodayEventsByClassId = async (idClass, client) => {
    const {rows: events} = await client.query(`

        SELECT id,name,description, TO_CHAR(date, 'DD Mon YYYY') as date
        FROM event
        WHERE IdClass = 1
          and date = current_date

        `, [idClass]);
    return events;
}
module.exports.getWeekEventsByClassId = async (idClass, client) => {
    const {rows: events} = await client.query(`

        SELECT id,name,description, TO_CHAR(date, 'DD Mon YYYY') as date
        FROM event
        WHERE IdClass = 1
          and (date between (current_date + '1 day':: interval) and (current_date + '1 day':: interval + '1 week':: interval))

        `, [idClass]);
    return events;
}

module.exports.postEvent = async (name, date, description, idClass) => {
    return await client.query("INSERT INTO Event(Name, Date, Description, IdClass)VALUES($1,$2,$3,$4)", [name, date, description, idClass]);
}

module.exports.updateEvent = async (id, name, date, description) => {
    const query =  `UPDATE Event
        SET Name = $2
            Date = $3
            Description = $4
        WHERE id = $1`;
    return await client.query(query, [id, name, date, description]);
}

module.exports.deleteEvent = async (id) => {
    return await client.query("DELETE FROM Event WHERE id=$1", [id, name, date, description]);
}