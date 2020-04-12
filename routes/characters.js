const express = require('express');
const router = express.Router();
var characters = require('../characters.json');
var basicAuth = require('express-basic-auth');

router.use(basicAuth({
    users: { 'admin': 'supersecret' },
    unauthorizedResponse: {
        message: "Sorry Wizard, can't let you in."
    }

}))

router.get('/',
    function (req, res) {
        res.json(characters);
    });

router.get('/:characterId', function (req, res) {
    let result = characters.find(character => character._id == req.params.characterId);
    res.send(result);
});

module.exports = router;