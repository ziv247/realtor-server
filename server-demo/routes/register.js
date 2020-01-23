var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');
const crypto = require('crypto');


router.post('/', async (req, res) => {
    const userDetails = req.body;
    userDetails.password = crypto.pbkdf2Sync(req.body.password, 'realtorrocks', 100000, 64, 'sha512').toString('base64');
    let results, user;
    try {
        results = await DB.insertUser(userDetails);
        user = await DB.checkUser(userDetails.email, userDetails.password);
        user = { ...user[0] };
        console.log(user)
        if (user) {
            res.cookie("user", JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24 }).status(200).send(user);
        } else {
            res.status(401).json({ status: 401, msg: "Not today" });
        }
    } catch (error) {
        res.status(409).json({ status: 409, msg: error });
        console.log("Failed: ", error);
    }
});

module.exports = router;
