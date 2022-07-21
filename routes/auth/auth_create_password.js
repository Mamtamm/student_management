const { handleEx } = require('../../helper/handle_ex');
const { validate } = require('../../helper/validator');
const { User } = require('../../models');

const passwordRule = {
  password: 'required',
  otp: 'required|numeric',
};

module.exports = async (req, res) => {
  validate(passwordRule, req.body, res);

  const { password, otp } = req.body;

  let user = await User.findOne({
    attributes: User.basicAttributes(),
    where: [{ reset_otp: otp.toString() }],
  });

  if (!user) return res.status(401).send({ message: 'Invalid details provided' });
  else {
    user.password = password;
    user.resetOtp = '';

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
