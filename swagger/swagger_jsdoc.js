const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API SmartClass', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    // Path to the API docs
    apis: [
        './controleur/*',
        './middleware/*',
        './modele/*',
        './route/*',
    ],
};
const swaggerSpec = swaggerJSDoc(options);
//fs.writeFileSync('./swagger/spec.json', JSON.stringify(swaggerSpec));
module.exports.swaggerDoc = swaggerSpec;
