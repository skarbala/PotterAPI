const express = require('express');
const router = express.Router();
const spells = require('../spells.json');
const spellController = require('../controllers/spellsController.js')
module.exports = router;

router.get('/', spellController.spells_list);

router.post('/', spellController.new_spell);

router.get('/:spellId', spellController.specific_spell)

