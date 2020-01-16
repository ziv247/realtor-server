var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');
const crypto = require('crypto');


router.post('/', function (req, res) {
    const userDetails = req.body;
    userDetails.password = crypto.pbkdf2Sync(req.body.password, 'realtorrocks', 100000, 64, 'sha512').toString('base64');
    DB.insertUser(userDetails).then(results => {
        res.send(results)
        console.log(results)
    });
    // const { first_name, last_name, email, password, phone } = req.body;
    // const query = 
    // `INSERT INTO users
    // (\`id\`, \`role_id\`, \`first_name\`, \`last_name\`, \`email\`, \`password\`, \`phone\`)
    // VALUES
    // (DEFAULT, 1, '${first_name}', '${last_name}', '${email}', '${password}', '${phone}')`
    // DB.checkUser(email, password).then((results) => {
    //     results.length == 1
    //         ?
    //         (res.cookie("user", results[0]),
    //             res.send(req.cookies))
    //         :
    //         res.status(401).json({ status: 401, msg: "Not today" });



    // });

});


module.exports = router;
