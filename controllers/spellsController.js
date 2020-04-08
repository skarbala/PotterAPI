var spells = require('../spells.json');
const joi = require('joi');


const schema = joi.object().keys({
    spell: joi.string().alphanum().min(3).max(30).required(),
    type: joi.string().valid('Charm', 'Enchantment', 'Curse'),
    effect: joi.string().min(4),
    id: joi.any()

});
const randomId = require('random-id');

exports.spells_list = function (req, res) {
    let result = spells;
    if (typeof req.query.type !== 'undefined') {
        result = spells.filter(spell => spell.type == req.query.type)
    }
    return res.json(result);
}

exports.specific_spell = function (req, res) {
    let result = spells.find(spell => spell._id == req.params.spellId);
    if (typeof result !== 'undefined') {
        return res.send(result);
    }
    return res.status(404).send({ message: "Spell not found" });
}

exports.delete_spell = function (req, res) {
    let result = spells.find(spell => spell._id == req.params.spellId);
    if (typeof result == 'undefined') {
        return res.status(404).send({ message: "Spell not found" });
    }
    spells = spells.filter(spell => spell._id != req.params.spellId);
    return res.send({
        message: 'spell deleted'
    });
}

exports.new_spell = function (req, res) {
    var len = 30;
    var pattern = 'aA0'

    var newSpell = {
        spell: req.body.spell,
        type: req.body.type,
        effect: req.body.effect,
        id: randomId(len, pattern)
    }

    let result = spells.find((spell) => spell.spell === newSpell.spell);
    if (typeof result !== 'undefined') {
        return res.status(400).send({
            message: 'Spell ' + newSpell.spell + ' already exists'
        })
    }

    result = joi.validate(newSpell, schema);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        return res.status(422).json({
            message: 'Invalid request',
            data: error
        })
    }

    spells.push(newSpell);
    return res.status(201).json({
        message: "Spell created",
        spell: {
            id: newSpell.id
        }
    });
}