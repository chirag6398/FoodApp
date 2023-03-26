var outletModel = require("../model/outlet.model");

module.exports = {
  saveTableView: function (req, res) {
    console.log(req.body);
    outletModel
      .findOneAndUpdate(
        { _id: req.body._id },
        { $push: { table: req.body.tables } }
      )
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send(err);
      });
  },
  deleteOutlet: function (req, res) {
    console.log(req.body);
    outletModel
      .findByIdAndUpdate({ _id: req.body.outletId }, { isDeleted: true })
      .then(function (result) {
        return res.send({ message: "deleted outlet" });
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
  searchOutletBySearchText: function (req, res) {
    var regex = new RegExp(req.params.searchText, "i");

    outletModel
      .find({ name: { $regex: regex } })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);
      });
  },
};
