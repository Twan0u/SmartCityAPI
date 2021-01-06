const express = require('express');
const Router = require('./route');
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();
//variables
require('dotenv').config(); //used to get the app port in .env file
let httpPort = process.env.API_HTTP_PORT || 8080;

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger_jsdoc').swaggerDoc;

//Middlewares
try {
    app.use(express.json());
}catch(e){
    res.sendStatus(400);
    console.log("ERROR : The body of the request does not contains an valid json");
}

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        res.send();
    });
});

//Routes
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc));
app.use(Router);

app.listen(httpPort, () => {
    console.log(`The app is listening on port : ${httpPort}`);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
});