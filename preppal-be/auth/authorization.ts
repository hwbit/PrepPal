const jwtAuth = require("jsonwebtoken");
const configAuth = require("../configs/secrets.ts")

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "you do not have right authorization." });
    }

    try {
        const decoded = jwtAuth.verify(token, configAuth.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token." });
    }
};