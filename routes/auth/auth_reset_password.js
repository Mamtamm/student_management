const { handleEx } = require('../../helper/handle_ex');
const { validate } = require('../../helper/validator');
const { User } = require('../../models');

const resetPasswordRule = {
  email: 'required|email',
};

module.exports = async (req, res) => {
  const isValid = validate(resetPasswordRule, req.body, res);
  if (!isValid) return;

  const { email } = req.body;
  let user = await User.findOne({
    attributes: User.allAttributes(),
    where: [{ email: email }],
  });

  if (!user) res.status(422).send({ error: 'Invalid details provided' });
  else {
    user.password = 'sample';

    user
      .save()
      .then(async (c) => {
        return res.status(202).send();
      })
      .catch((ex) => {
        error = handleEx(res, ex);
        return res.status(error.code).send(error.msg);
      });
  }
};
