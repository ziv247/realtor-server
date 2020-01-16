var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');
const users = require('./data').users;
const orders = require('./data').orders;
const crypto = require('crypto');



router.post('/', function (req, res) {
    let { email, password } = req.body;
    password = crypto.pbkdf2Sync(password, 'realtorrocks', 100000, 64, 'sha512').toString('base64');
    DB.checkUser(email, password).then((results) => {
        results.length == 1
            ?
            (res.cookie("user", results[0]),
                res.send(req.cookies))
            :
            res.status(401).json({ status: 401, msg: "Not today" });



    });

});


module.exports = router;
