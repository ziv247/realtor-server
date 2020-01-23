
var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');

/* GET countries listing. */
router.get('/:countryId', async function (req, res, next) {
    const result = await DB.getCityByCountryId(req.params.countryId);
    res.send(result);
});







module.exports = router;
