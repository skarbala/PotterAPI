var spells = require('../spells.json');
const joi = require('joi');
const initialSpells = require('../spells.json');
const schema = joi.object().keys({
    spell: joi.string().min(3).max(30).required().regex(/^\w+(?:\s+\w+)*$/),
    type: joi.string().valid('Charm', 'Enchantment', 'Curse', 'Spell', 'Hex', 'Jinx'),
    effect: joi.string().min(4),
    isUnforgivable: joi.boolean().required(),
    id: joi.any()
});

const randomId = require('random-id');

exports.spells_list = function (req, res) {
    let result = spells;
    if (typeof req.query.type !== 'undefined') {
        result = spells.filter(spell => spell.type == req.query.type)
    }
    if (typeof req.query.isUnforgivable !== 'undefined') {
        result = result.filter(spell => spell.isUnforgivable == req.query.isUnforgivable)
    }
    if (typeof req.query.limit !== 'undefined') {
        result = result.slice(0, req.query.limit);
    }
    return res.json(result);
}
exports.delete_all = function (req, res) {
    spells = [];
    res.send({ message: 'Mischief managed' })
}

exports.reset = function (req, res) {
    spells = initialSpells.slice(0);
    res.send({ message: 'Aparecium', spells: spells })
}
exports.specific_spell = function (req, res) {
    let result = spells.find(spell => spell.id == req.params.spellId);
    if (typeof result !== 'undefined') {
        return res.send(result);
    }
    return res.status(404).send({ message: "Spell not found" });
}

exports.delete_spell = function (req, res) {
    let result = spells.find(spell => spell.id == req.params.spellId);
    if (typeof result == 'undefined') {
        return res.status(404).send({ message: "Spell not found" });
    }
    spells = spells.filter(spell => spell.id != req.params.spellId);
    return res.send({
        message: 'spell deleted'
    });
}

exports.update_spell = function (req, res) {
    let result = spells.find(spell => spell.id == req.params.spellId);
    if (typeof result == 'undefined') {
        return res.status(404).send({ message: "Spell not found" });
    }

    var newSpell = {
        spell: req.body.spell,
        type: req.body.type,
        effect: req.body.effect,
        isUnforgivable: req.body.isUnforgivable,
        id: result.id
    }

    result = joi.validate(newSpell, schema);
    const { value, error } = result;
    const valid = error == null;

    if (!valid) {
        return res.status(422).json({
            message: 'Wizard, I\'m sory but your request is invalid',
            data: error
        })
    }

    spells = spells.filter(spell => spell.id != req.params.spellId);
    spells.push(newSpell);
    return res.status(201).json({
        message: "Spell updated",
        spell: {
            id: newSpell.id
        }
    });
}

exports.new_spell = function (req, res) {
    var len = 30;
    var pattern = 'aA0'

    var newSpell = {
        spell: req.body.spell,
        type: req.body.type,
        effect: req.body.effect,
        isUnforgivable: req.body.isUnforgivable,
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