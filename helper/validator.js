const Validator = require('validatorjs');
exports.validate = (rules, data, res) => {
  const validation = new Validator(data, rules, res);
  if (validation.fails()) {
    validation.fails(() => {
      return res.status(422).send(validation.errors);
    });
  } else return true;
};
