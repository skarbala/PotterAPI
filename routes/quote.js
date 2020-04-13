const express = require('express');
const router = express.Router();
module.exports = router;
const quotes = require('../quotes.json')

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

router.get('/', function (req, res) {
    res.json(getRandomQuote())
});
