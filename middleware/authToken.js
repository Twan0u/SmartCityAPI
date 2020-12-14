const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  responses:
 *      401:
 *          description: JWT is
 *      MissingJWT:
 *          description: le JWT n'est pas présent
 */
module.exports.authToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');//get the token from user
    const token = authHeader && authHeader.split(' ')[1];

    if (token==null){return res.sendStatus(401);}

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) {return res.sendStatus(401);}//bad token
            req.user=user; //user data stored inside the jwt
            next();
        });

};