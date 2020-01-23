
var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');

/* GET countries listing. */
router.get('/', async function (req, res, next) {
    const result = await DB.getCountries();
    res.send(result);
});





module.exports = router;
