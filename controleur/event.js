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

module.exports.postEvent= (req, res) => {
    const {name, date, description} = req.body;
    const id = req.params.id;

    const response = EventModel.postEvent(id, name, date, description);
    if(response){
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
}

module.exports.updateEvent = (req, res) => {
    const {name, date, description} = req.body;
    const id = req.params.id;
    const response = EventModel.updateEvent(id, name, date, description);
    if(response){
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.deleteEvent = (req, res) => {
    const id = req.params.id;
    const response = EventModel.deleteEvent(id);
    if(response){
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}