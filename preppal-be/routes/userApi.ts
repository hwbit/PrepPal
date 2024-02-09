const {check, validationResult } = require("express-validator") ;
const express = require("express");
const router = express.Router();

const User = require('../models/user.ts');

router.get('/', (req, res) => res.send('user api testing!'));

// router.get("/", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server error")
//     }
// });


// register 
router.post("/createUser", async (req, res) => {
    try {
        // // const errors = validationResult(req);
        // console.log(req);
        // // console.log(UserModel)
        // // return res.status(400).json(
        // //     {
        // //         msg: req
        // //     }
        // // )
        // const {username, password} = req.body;
        let username = "test";
        let password = "password";

        let user = await User.findOne({username: username});
        if (user) {
            return res.status(400).json( {
                errors: [{ msg: "username already exists" }]
            });
        }

        user = new User({
            username,
            password
        }
        );

        const newUser = await user.save();
        res.json({newUser});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});


module.exports = router;