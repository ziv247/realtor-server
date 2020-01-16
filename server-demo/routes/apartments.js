const orders = require('./data').orders;
var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');

/* GET apartments listing. */
router.get('/', async function (req, res, next) {
  const result = await DB.getAllApartments(req.query);
  res.send(result);
});

router.get('/:apartmentId', async function (req, res, next) {
  const results = await DB.getApartmentsById(req.params.apartmentId);
  console.log("by id: ", results);
  res.send(results);
});

router.put('/:apartmentsId', function (req, res) {
  customerId, city, country, page = 1, size = 10
});

router.delete('/:apartmentsId', function (req, res) {
  orders.splice(orders.findIndex(order => order.id == req.params.orderId), 1);
  res.send(orders);
});



module.exports = router, orders;
