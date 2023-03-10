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
  getOutlet: function (req, res) {
    console.log(req.params);
    return outletModel
      .findById({ _id: req.params.id })
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).send(err);
      });
  },
};
