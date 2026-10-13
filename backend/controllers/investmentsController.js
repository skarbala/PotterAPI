const fs = require("fs");
const path = require("path");
const joi = require("joi");

const investmentsPath = path.join(__dirname, "../investments.json");

const fundSchema = joi.object({
  id: joi.number().required(),
  name: joi.string().required(),
  risk: joi.string().required(),
  interestRate: joi.number().required(),
});

const investmentSchema = joi.object({
  customerName: joi.string().min(1).required(),
  oneTimeInvestment: joi.number().required(),
  fund: fundSchema.required(),
  years: joi.number().integer().min(1).required(),
  totalInvestment: joi.number().required(),
  interestIncome: joi.number().required(),
  taxes: joi.number().required(),
  netIncome: joi.number().required(),
});

function readInvestments() {
  try {
    const data = fs.readFileSync(investmentsPath, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeInvestments(investments) {
  fs.writeFileSync(investmentsPath, JSON.stringify(investments, null, 2));
}

exports.investments_list = function (req, res) {
  return res.json(readInvestments());
};

exports.save_investments = function (req, res) {
  if (!Array.isArray(req.body)) {
    return res.status(422).json({
      message: "Wizard, investments must be sent as an array",
    });
  }

  for (const investment of req.body) {
    const { error } = investmentSchema.validate(investment);
    if (error) {
      return res.status(422).json({
        message: "Wizard, I'm sorry but your request is invalid",
        data: error.details,
      });
    }
  }

  writeInvestments(req.body);
  return res.json(req.body);
};

exports.clear_investments = function (req, res) {
  writeInvestments([]);
  return res.json({
    message: "All Gringotts investments cleared",
    investments: [],
  });
};
