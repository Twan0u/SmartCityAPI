const pool = require("../modele/database");

const EventModel = require("../modele/event");

module.exports.getEvents = async (req, res) => {

    const client = await pool.connect();

    try{

        const events = await EventModel.getEvents(req.user.idclass,client);
        res.status(200).json(events);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/events with function getEvents")
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.getTodayEvents = async (req, res) => {

    const client = await pool.connect();

    try{

        const events = await EventModel.getTodayEventsByClassId(req.user.idclass,client);
        res.status(200).json(events);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/events with function getTodayEvents")
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.getWeekEvents = async (req, res) => {

    const client = await pool.connect();

    try{

        const events = await EventModel.getWeekEventsByClassId(req.user.idclass,client);
        res.status(200).json(events);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/class with function getWeekEvents")
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.postEvent= async(req, res) => {

    const client = await pool.connect();

    try{

        const {name, date, description} = req.body;

        if(!name||!date){return res.sendStatus(400);}//missing data for post

        await EventModel.postEvent(name, date, description, req.user.id, client);
        return res.sendStatus(201);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/events with function postEvent")
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.updateEvent = async (req, res) => {

    const client = await pool.connect();

    try{

        const {name, date, description} = req.body;

        if(!name||!date){return res.sendStatus(400);}//missing data for post

        const id = parseInt(req.params.id);
        if(isNaN(id)){return res.sendStatus(400);}//check if param id exist and is a number

        await EventModel.updateEvent(id, name, date, description, client);
        res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/events with function updateEvent")
        console.log(error);

    } finally {

        client.release();

    }
}

module.exports.deleteEvent = async (req, res) => {

    const client = await pool.connect();

    try{

        const id = parseInt(req.params.id);
        if(isNaN(id)){return res.sendStatus(400);}

        await EventModel.deleteEvent(id,client);
        res.sendStatus(200);

    } catch (error){

        res.sendStatus(500);
        console.log("ERROR in Controller/events with function deleteEvent")
        console.log(error);

    } finally {

        client.release();

    }
}