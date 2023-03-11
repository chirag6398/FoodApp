var orderModel = require("../model/order.model");
var mongoose = require("mongoose");
var outletModel = require("../model/outlet.model");
module.exports = {
  createOrder: function (req, res) {
    console.log("data", req.body);
    var order = undefined;
    if (req.body.type === "dine-in") {
      order = new orderModel({
        customer: req.body.customer,
        items: req.body.item,
        outlet: req.body.outlet,
        orderId: req.body.orderId,
        tableNumber: req.body.allotedTables,
        type: req.body.type,
        status: "pending",
        brand: req.body.brand,
      });
    } else {
      order = new orderModel({
        customer: req.body.customer,
        items: req.body.item,
        outlet: req.body.outlet,
        orderId: req.body.orderId,
        type: req.body.type,
        status: "pending",
        brand: req.body.brand,
      });
    }

    // var pipeline=[
    //   {
    //     $match:{
    //       '_id':req.body.outlet._id,
    //     }
    //   },
    //   {
    //     $unwind:"$table"
    //   },
    //   {

    //   }

    // ]
    // req.params.allotedTables = [1, 13, 14];
    console.log(req.body.allotedTables);
    console.log(order);
    var data1 = order.save();
    var data2 = outletModel.updateMany(
      { _id: req.body.outlet._id },
      { $set: { "table.$[elem].isAvailable": false } },
      {
        new: true,
        arrayFilters: [{ "elem.number": { $in: req.body.allotedTables } }],
      }
    );

    // var data2 = outletModel.aggregate([
    //   {
    //     $match: {
    //       _id: mongoose.Types.ObjectId(req.body.outlet._id),
    //     },
    //   },
    //   {
    //     $unwind: "$table",
    //   },
    //   {
    //     $project: { table: 1 },
    //   },
    //   {
    //     $match: {
    //       "table.number": { $in: req.params.allotedTables },
    //     },
    //   },
    // ]);

    Promise.all([data1, data2])
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);

        return res.status(500).send({ error: err });
      });
  },
  getOrders: function (req, res) {
    orderModel
      .find({ "outlet._id": mongoose.Types.ObjectId(req.params.id) })
      .then(function (result) {
        console.log(result);
        return res.send(result);
      })
      .catch(function (err) {
        console.log(err);

        return res.status(500).send({ error: err });
      });
  },
  updateStatus: function (req, res) {
    orderModel
      .findByIdAndUpdate(
        { _id: req.body._id },
        { $set: { status: req.body.status } }
      )
      .then(function (result) {
        return res.send(result);
      })
      .catch(function (err) {
        return res.status(404).send(err);
      });
  },
};
