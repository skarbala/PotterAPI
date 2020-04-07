const spells = require('../spells.json');
const randomId = require('random-id');

exports.spells_list = function(req,res){
    res.json(spells);
}

exports.specific_spell = function(req,res){
    let result = spells.filter(spell => spell._id == req.params.spellId);
    if (result.length == 0) {
        res.status(404)
        res.send({ message: "Spell not found" });
    }
    res.send(result[0]);
}

exports.delete_spell = function(req,res){
    if(typeof req.header("Content-Type")!== 'undefined'){
        res.status(400).send({message:"Sorry Nick you dont have header"});
    }
    res.send(result[0]);
}

exports.new_spell = function(req,res){
    var len = 30;
    var pattern = 'aA0'
    var id = randomId(len, pattern)
    if(typeof req.header("Content-Type")!== 'undefined'){
        res.status(400).send({message:"Sorry Nick you dont have header"});
    }
    var newSpell = {
        spell : req.body.spell,
        type : req.body.type,
        effect : req.body.effect,
        id : id
    }

    let result = spells.find((spell) => spell.spell === newSpell.spell);
    if (typeof result !== 'undefined'){
        res.status(400)
        res.send({
            message: newSpell.spell + ' already exists'
        })
    }

    spells.push(newSpell);
    res
        .status(201)
        .json({
        spell: newSpell,
        message: "Spell created",
    });
}