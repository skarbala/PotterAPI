const express = require('express');
const router = express.Router();
module.exports = router;
const houses = require('../houses.json')
const sortingHatQuotes = require('../sortinghatquotes.json')

function getRandomHouseName() {
    let houseNames = houses.map(house => house.name);
    return houseNames[Math.floor(Math.random() * houseNames.length)];
}

function getRandomQuote() {
    return sortingHatQuotes[Math.floor(Math.random() * sortingHatQuotes.length)];
}

router.get('/', function (req, res) {
    res.json({
        magicWandSays: getRandomQuote() + ' ' + getRandomHouseName()
    })
});
