var bcrypt = require("bcrypt");

module.exports = {
  hashPassword: function (password, next) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError, null);
      } else {
        bcrypt.hash(password, salt, function (hashError, hash) {
          return next(null, hash);
        });
      }
    });
  },
};
