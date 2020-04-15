let spells = require('../controllers/spellsController.js')

exports.spell_not_found = function (req, res, next) {
    let result = spells.find(spell => spell._id == req.params.spellId);
    if (typeof result == 'undefined') {
        return res.status(404).send({ message: "Spell not found" });
    }
    next();
}