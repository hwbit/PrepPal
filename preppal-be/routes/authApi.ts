const expressAuthApi = require("express");
const routerAuthApi = expressAuthApi.Router();
const jwtAuthApi = require("jsonwebtoken");
// const configAuthApi = require("../configs/secrets.ts");
const authAuthApi = require("../auth/authorization.ts");
const UserAuth = require("../models/user.ts");

const jwtSecret = process.env.JWT_SECRETS;

const SESSION_EXPIRY = 86400;

/**
 * GET - Get an account
 */
routerAuthApi.get("/", authAuthApi, async (req, res) => {
    try {
        const user = await UserAuth.findById(req.user.id).select("-password");
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

/**
 * POST - Login to an account
 */
routerAuthApi.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserAuth.findOne({ username });
        if (!user || password !== user.password) {
            return res.status(400).json({ errors: [ { msg: "Invalid username or password!" } ] });
        }

        const payload = { user: { id: user.id } };

        jwtAuthApi.sign(payload, jwtSecret, { expiresIn: SESSION_EXPIRY }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

module.exports = routerAuthApi;
