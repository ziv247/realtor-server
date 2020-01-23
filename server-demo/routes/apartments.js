var express = require('express');
var router = express.Router();
const DB = require('../modal/sql-connection');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: 'images/apartment/',
  filename: function (req, file, cbFunc) {
    cbFunc(null, file.originalname)
  }
});
const upload = multer({ storage });

/* GET apartments listing. */
router.get('/', (req, res, next) => {
  next();
}, async function (req, res, next) {
  console.log(req.query)
  const result = await DB.getAllApartments(req.query);
  res.send(result);
});

router.get('/:apartmentId/', async function (req, res, next) {
  const results = await DB.getApartmentsById(req.params.apartmentId);
  res.send(results);
});

router.post('/', upload.single('main_image'), async (req, res) => {
  try {
    console.log("Body: ", req.body);
    console.log("File: ", req.file);
    const apartmentDetails = req.body;
    const main_image = req.file.destination + req.file.originalname;
    console.log(main_image);
    apartmentDetails.main_image = main_image;
    // const images = req.files.slice(1);

    const apartmentId = await DB.insertApartment(apartmentDetails);
    // const addImages = await DB.addImagesToApartment(apartmentId, images);
    res.status(201).json({ apartmentId })
  } catch (error) {
    throw new Error(`Posting new apartment failed with ${error.message}`)
  }
});

// router.put('/:apartmentsId', function (req, res) {
//   customerId, city, country, page = 1, size = 10
// });

// router.delete('/:apartmentsId', function (req, res) {
//   // orders.splice(orders.findIndex(order => order.id == req.params.orderId), 1);
//   // res.send(orders);
// });



module.exports = router;
