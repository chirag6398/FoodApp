var employeeModel = require("../model/employee.model");
var hashPassword = require("../service/common.service").hashPassword;
var mongoose = require("mongoose");
module.exports = {
  logInHandler: function (req, res) {
    if (req.user._doc === undefined) {
      return res.status(req.user.status).send(req.user);
    } else {
      return res
        .status(200)
        .send({ user: req.user._doc, token: req.user.token });
    }
  },
  getUserById: function (req, res) {
    employeeModel
      .findById({ _id: req.params.id })
      .then(function (result) {
        // console.log(result);
        return res.status(200).send(result);
      })
      .catch(function (err) {
        // console.log(err);
        return res.status(500).send({ message: "no user found" });
      });
  },
  getUsers: function (req, res) {
    var filter = {
      isActive: true,
      isDeleted: false,
      userType: { $ne: "superAdmin" },
    };

    var query = req.query;

    var limit = query.limit;
    var pageNo = query.pageNo;
    var skip = (pageNo - 1) * limit;

    if (query.email) {
      filter["email"] = query.email;
    }
    if (query.brandName) {
      filter["brand.name"] = query.brandName;
    }
    if (query.userType) {
      filter["userType"] = query.userType;
    }
    if (query.number && query.number !== "null") {
      filter["number"] = +query.number;
    }

    return employeeModel
      .find(filter, { password: 0, createdAt: 0, updatedAt: 0 })
      .skip(skip)
      .limit(limit)
      .sort({ "brand.name": 1 })
      .then(function (result) {
        employeeModel.countDocuments(filter, function (err, count) {
          console.log(result, filter);
          return res.send({ data: result, count: count });
        });
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
  },
  updateUser: function (req, res) {
    var body = req.body;
    employeeModel
      .findOneAndUpdate(
        { _id: body.id },
        {
          userName: body.userName,
          firstName: body.firstName,
          email: body.email,
          number: body.number,
          lastName: body.lastName,
        }
      )
      .then(function (result) {
        return res.status(200).send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res
          .status(400)
          .send({ message: "email id and username should be unique" });
      });
  },
  updatePassword: function (req, res) {
    var body = req.body;
    hashPassword(body.password, function (err, hashedPassword) {
      if (err) {
        return res.status(500).send({ message: "internal error" });
      } else {
        employeeModel
          .findOneAndUpdate({ _id: body.id }, { password: hashedPassword })
          .then(function (result) {
            console.log(result, hashedPassword);
            return res.send({ message: "updated" });
          })
          .catch(function (err) {
            return res.status(500).send({ error: err });
          });
      }
    });
  },
  getOutletAgentEmployees: function (req, res) {
    employeeModel
      .find({
        $and: [{ "outlet._id": req.params.id }, { userType: "outletAgent" }],
      })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(404).send(err);
      });
  },
  searchUserBySearchText: function (req, res) {
    var regex = new RegExp(req.params.searchText, "i");

    employeeModel
      .find({ userName: { $regex: regex } })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  searchUserBySearchTextAndBrandId: function (req, res) {
    var query = req.query;

    var regex = new RegExp(query.searchText, "i");

    employeeModel
      .find({
        "brand._id": mongoose.Types.ObjectId(query.id),
        userName: { $regex: regex },
      })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
};
