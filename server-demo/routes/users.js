var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');


/* GET users listing. */
router.get('/', function (req, res, next) {
  DB.getAll("users").then((results) => res.send(results));
});
router.get('/:userId/apartments', async function (req, res, next) {
  const results = await DB.getApartmentsByUserId(req.params.userId);
  res.send(results);
});
// router.get('/:userId/orders', function (req, res) {
//   const user = users.find(user => user.id == req.params.userId);
//   res.send({ name: user.name, orders: orders.filter(order => order.userId == user.id) })
// });

router.put('/:userId', function (req, res) {
  users[users.findIndex(user => user.id == req.params.userId)] = req.body;
  res.send(users)
});


// router.put('/:userId/orders/:orderId', function (req, res) {
//   orders[orders.findIndex(order => order.id == req.params.orderId)] = req.body;
//   res.send(orders);
// });

router.post('/', function (req, res) {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.send(users)
});

router.delete('/:userId', function (req, res) {
  users.splice(users.findIndex(user => user.id == req.params.userId), 1);
  res.send(users)
});

module.exports = router;
