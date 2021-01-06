module.exports.permit = (...permittedRoles) =>{
    return (req, res, next) => {
        if (req.user && permittedRoles.includes(req.user.role)) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            res.sendStatus(403); // user is forbidden
        }
    };
}