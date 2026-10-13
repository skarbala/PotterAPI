const houses = require("../houses.json");
const characters = require("../characters.json");

function resolveMembers(memberIds) {
  return memberIds.map((id) => {
    const character = characters.find((entry) => entry.id === id);
    if (!character) {
      return { id, name: "Unknown", role: "unknown" };
    }
    return {
      id: character.id,
      name: character.name,
      role: character.role || "unknown",
    };
  });
}

function withResolvedMembers(house) {
  return {
    ...house,
    members: resolveMembers(house.members),
  };
}

exports.houses_list = function (req, res) {
  res.json(houses.map(withResolvedMembers));
};

exports.specific_house = function (req, res) {
  const result = houses.find((house) => house.id == req.params.houseId);
  if (typeof result === "undefined") {
    return res.status(404).send({ message: "House not found" });
  }
  return res.send(withResolvedMembers(result));
};
