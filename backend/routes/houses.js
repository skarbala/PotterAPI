const express = require('express');
const router = express.Router();
const houseController = require('../controllers/housesController.js')
module.exports = router;
const verifyToken = require('../app.js');
const checkToken = require('../middleware/auth.js');

router.use(verifyToken, checkToken);

router.get('/', houseController.houses_list);

router.get('/:houseId', houseController.specific_house)

