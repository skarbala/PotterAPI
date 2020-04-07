var spells = require('../spells.json');
const randomId = require('random-id');

exports.spells_list = function(req,res){
    let result = spells;
    if(typeof req.query.type !== 'undefined'){
        result = spells.filter(spell=>spell.type ==req.query.type)
    }
    res.json(result);
}

exports.specific_spell = function(req,res){
    let result = spells.find(spell => spell._id == req.params.spellId);
    if (typeof result !== 'undefined') {
        res.send(result);
    }
    res.status(404).send({ message: "Spell not found" });
}


exports.delete_spell = function(req,res){
    if(typeof req.header("Content-Type")!== 'undefined'){
        res.status(400).send({message:"Sorry Nick you dont have HEADr"});
    }
    let result = spells.find(spell => spell._id == req.params.spellId);
    if (typeof result == 'undefined') {
        res.status(404).send({ message: "Spell not found" });
    }
    spells = spells.filter(spell => spell._id != req.params.spellId);
    res.send({
        message:'spell deleted'
    });
}

exports.new_spell = function(req,res){
    var len = 30;
    var pattern = 'aA0'
    var id = randomId(len, pattern)
    if(typeof req.header("Content-Type")!== 'undefined'){
        res.status(400).send({message:"Sorry Nick you dont have HEADer"});
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
        .send({
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