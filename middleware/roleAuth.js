/*
 * @swagger
 * components:
 *  roleAuth:
 *  todo input list of roles that have permission to access
 *   error 403 if role of user not in list
 *      401:
 *          description: JWT is
 *      MissingJWT:
 *          description: le JWT n'est pas présent
 */
module.exports.permit = (...permittedRoles) =>{
    return (req, res, next) => {
        if (req.user && permittedRoles.includes(req.user.role)) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            res.sendStatus(403); // user is forbidden
        }
    };
}