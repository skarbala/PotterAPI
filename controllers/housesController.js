const houses = require('../houses.json');
const randomId = require('random-id');

exports.houses_list = function(req,res){
    res.json(houses);
}

exports.specific_house = function(req,res){
    let result = houses.filter(house => house._id == req.params.houseId);
    if (result.length == 0) {
        res.status(404)
        res.send({ message: "House not found" });
    }
    res.send(result[0]);
}
