function validateName(name) {
  const re = /^[a-zA-Z ]{3,30}$/;
  return re.test(name);
}

function validateUserName(userName) {
  const re = /^[a-z A-Z 0-9]{3,30}$/;

  return re.test(userName);
}

function validateCity(city) {
  const re = /^[a-zA-Z ]{2,30}$/;
  return re.test(city);
}

function validateAddress(address) {
  const re = /^[a-zA-Z0-9\s,'-]*$/;
  return re.test(address);
}

function validateNumber(number) {
  const re = /^[0-9]{10,10}$/;
  return re.test(number);
}

function validatePrice(price) {
  var re = /^([1-9]{1})([0-9]{1,4})?$/;
  return re.test(price);
}

function validateEmail(email) {
  var re = /^([a-z A-Z 0-9 \. -]+)@([0-9 a-z A-Z -]+).([a-z]{2,8})$/;

  return re.test(email);
}

function validatePinCode(pinCode) {
  var re = /^[1-9][0-9]{5}$/;
  return re.test(pinCode);
}

function validatePassword(password) {
  var regExLowerCase = /[a-z]/;
  var regExUpperCase = /[A-Z]/;
  var regExNumbericCharacter = /[0-9]/;

  if (
    !regExLowerCase.test(password) ||
    !regExNumbericCharacter.test(password) ||
    !regExUpperCase.test(password) ||
    password.length < 5 ||
    password.length > 8
  ) {
    return false;
  }

  return true;
}

module.exports = {
  validateUserData: function (req, res, cb) {
    var body = req.body;
    console.log(body);

    var userName = body.userName;
    var firstName = body.firstName;
    var password = body.password;
    var cpassword = body.cpassword;
    var number = body.number;
    var email = body.email;
    var address = body.address;
    var pinCode = body.pinCode;
    var city = body.city;

    if (!validateUserName(userName)) {
      return res
        .status(403)
        .send({ message: "length of userName must be greater then 3" });
    }

    if (!validateName(firstName)) {
      return res
        .status(403)
        .send({ message: "length of first must be greater then 3" });
    }

    if (!validateEmail(email)) {
      return res.status(403).send({ message: "please enter valid email" });
    }

    if (!validateAddress(address)) {
      return res.status(403).send({ message: "please enter valid address" });
    }

    if (!validatePassword(password)) {
      return res
        .status(403)
        .send({ message: "password does not fill criteria" });
    }

    if (password !== cpassword) {
      return res
        .status(403)
        .send({ message: "confirm password does not match password" });
    }

    if (!validateNumber(number)) {
      return res.status(403).send({ message: "number is wrong" });
    }

    if (!validateCity(city)) {
      return res.status(403).send({ message: "please enter valid city" });
    }

    if (!validatePinCode(pinCode)) {
      return res.status(403).send({ message: "please enter valid pinCode" });
    }

    cb();
  },
  validateBrand: function (req, res, cb) {
    var body = req.body;
    // var file = body.file;
    var name = body.name;
    var email = body.email;
    var city = body.city;
    var address = body.address;
    var number = body.number;
    var pinCode = body.pinCode;

    // console.log(body);
    // if (!file) {
    //   return res.status(404).send({ err: "file not found" });
    // }

    if (!validateEmail(email)) {
      return res.status(403).send({ message: "please enter valid email" });
    }
    if (!validateNumber(number)) {
      return res.status(403).send({ message: "please enter valid number" });
    }

    if (!validateAddress(address)) {
      return res.status(403).send({ message: "please enter valid address" });
    }

    if (!validateName(name)) {
      return res.status(403).send({ message: "please enter valid name" });
    }

    if (!validateCity(city)) {
      return res.status(403).send({ message: "please enter valid city" });
    }

    if (!validatePinCode(pinCode)) {
      return res.status(403).send({ message: "please enter valid pinCode" });
    }

    console.log("called cb");

    cb();
  },
  validateOutlet: function (req, res, cb) {
    var body = req.body;
    console.log(req.body, req.file);
    var name = body.name;
    var type = body.type;
    var email = body.email;
    var city = body.city;
    var address = body.address;
    var description = body.description;
    var number = body.number;
    var pinCode = body.pinCode;

    if (!name || !email || !city || !address || !description || !number) {
      return res.status(404).send({ err: "plz fill all fields" });
    }

    if (!validateEmail(email)) {
      return res.status(403).send({ message: "please enter valid email" });
    }

    if (!validateAddress(address)) {
      return res.status(403).send({ message: "please enter valid address" });
    }

    if (!validateName(name)) {
      return res.status(403).send({ message: "please enter valid name" });
    }

    if (!validateName(type)) {
      return res.status(403).send({ message: "please enter valid type" });
    }

    if (!validateNumber(number)) {
      return res.status(403).send({ message: "please enter valid number" });
    }

    if (!validateCity(city)) {
      return res.status(403).send({ message: "please enter valid city" });
    }

    if (!validatePinCode(pinCode)) {
      return res.status(403).send({ message: "please enter valid pinCode" });
    }

    cb();
  },
  validateCategory: function (req, res, cb) {
    var body = req.body;
    // var file = body.file;
    var name = body.name;

    // if (!file) {
    //   return res.status(404).send({ err: "file not found" });
    // }

    if (!validateName(name)) {
      return res.status(403).send({ message: "please enter valid name" });
    }

    cb();
  },
  validateSuperCategory: function (req, res, cb) {
    var body = req.body;
    // var file = body.file;
    var name = body.name;

    // if (!file) {
    //   return res.status(404).send({ err: "file not found" });
    // }

    if (!validateName(name)) {
      return res.status(403).send({ message: "please enter valid name" });
    }

    cb();
  },
  validateProduct: function (req, res, cb) {
    var body = req.body;
    var name = body.name;
    var price = body.price;

    console.log(name, validateName(name));

    // if (!validateName(name)) {
    //   return res.status(403).send({ message: "please enter valid name" });
    // }

    if (!validatePrice(price)) {
      return res.status(403).send({ message: "please enter valid price" });
    }

    cb();
  },
};
