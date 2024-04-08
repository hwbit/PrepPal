const jwtAuth = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRETS;


module.exports = function(req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "you do not have right authorization." });
    }

    try {
        const decoded = jwtAuth.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "Invalid token." });
    }
};
