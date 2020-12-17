const pool = require("../modele/database");

const EventModel = require("../modele/event");

module.exports.getEvents = async (req, res) => {
    const client = await pool.connect();

    try{
        const events = await EventModel.getEvents(req.user.idclass,client);
        if(events !== undefined){
            res.status(200).json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


module.exports.getTodayEvents = async (req, res) => {
    const client = await pool.connect();
    try{
        const events = await EventModel.getTodayEventsByClassId(req.user.idclass,client);
        if(events !== undefined){
            res.status(200).json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getWeekEvents = async (req, res) => {
    const client = await pool.connect();
    try{
        const events = await EventModel.getWeekEventsByClassId(req.user.idclass,client);
        if(events !== undefined){
            res.status(200).json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.postEvent= async(req, res) => {
    const client = await pool.connect();
    try{
        const {name, date, description} = req.body;
        const id = req.user.id;
        let result = EventModel.postEvent(name, date, description, id,client);
        return res.sendStatus(201);
    }catch (e) {
        res.sendStatus(500);
    }
}

module.exports.updateEvent = async (req, res) => {
    const client = await pool.connect();
    try{
        const {name, date, description} = req.body;
        const id = req.user.id;
        const response = EventModel.updateEvent(id, name, date, description, client);
        res.sendStatus(200);
    }catch (e) {
        res.sendStatus(500);
    }
}

module.exports.deleteEvent = async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id;
    if(EventModel.deleteEvent(id,client)){
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
}