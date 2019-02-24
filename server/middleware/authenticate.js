var {Account} = require('./../model/account');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  Account.findByToken(token).then((account) => {
    if (!account) {
      return Promise.reject();
    }

    req.account = account;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
