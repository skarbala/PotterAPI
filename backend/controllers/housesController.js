const houses = require('../houses.json');

exports.houses_list = function (req, res) {
    res.json(houses);
}

exports.specific_house = function (req, res) {
    let result = houses.find(house => house._id == req.params.houseId);
    if (typeof result == 'undefined') {
        res.status(404)
        res.send({ message: "House not found" });
    }
    res.send(result);
}
