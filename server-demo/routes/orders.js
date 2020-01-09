const orders = require('./data').orders;
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(orders);
});

router.get('/:orderId', function(req, res, next) {
  res.send(orders.find(order=> order.id == req.params.orderId)|| {});
});

router.put('/:orderId', function (req, res) {
    orders[orders.findIndex(order=> order.id == req.params.orderId)] = req.body;
    res.send(orders);
  });

  router.delete('/:orderId', function (req, res) {
    orders.splice(orders.findIndex(order=> order.id == req.params.orderId),1);
    res.send(orders);
  });



module.exports = router,orders;
