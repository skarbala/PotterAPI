const express = require("express");
const router = express.Router();
const investmentsController = require("../controllers/investmentsController.js");

module.exports = router;

router.get("/", investmentsController.investments_list);

router.put("/", investmentsController.save_investments);

router.delete("/", investmentsController.clear_investments);
