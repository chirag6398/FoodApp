var orderModel = require("../model/order.model");
var mongoose = require("mongoose");
var outletModel = require("../model/outlet.model");
var moment = require("moment");
var startDate = moment().subtract(1, "month").toDate();
var endDate = moment().toDate();

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

      var data1 = order.save();
      var data2 = outletModel.updateOne(
        { _id: req.body.outlet._id },
        { $set: { "table.$[elem].isAvailable": false } },
        {
          new: true,
          arrayFilters: [{ "elem.number": { $in: req.body.allotedTables } }],
        }
      );

      Promise.all([data1, data2])
        .then(function (result) {
          console.log(result);
          return res.send(result);
        })
        .catch(function (err) {
          console.log(err);

          return res.status(500).send({ error: err });
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

      var data1 = order.save();

      Promise.all([data1])
        .then(function (result) {
          console.log(result);
          return res.send(result);
        })
        .catch(function (err) {
          console.log(err);

          return res.status(500).send({ error: err });
        });
    }
  },
  getOrders: function (req, res) {
    var data1 = orderModel.find({
      $and: [
        { "outlet._id": mongoose.Types.ObjectId(req.params.id) },
        { createdAt: { $gte: startDate } },
      ],
    });

    var data2 = outletModel.findById(
      { _id: req.params.id },
      { _id: 0, table: 1 }
    );

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
  updateStatus: function (req, res) {
    console.log(req.body);

    if (req.body.status === "completed" && req.body.orderType === "dine-in") {
      var data1 = outletModel.updateOne(
        { _id: req.body.outletId },
        { $set: { "table.$[elem].isAvailable": true } },
        {
          new: true,
          arrayFilters: [{ "elem.number": { $in: req.body.tableNumbers } }],
        }
      );

      var data2 = orderModel.findByIdAndUpdate(
        { _id: req.body._id },
        { $set: { status: req.body.status } }
      );

      Promise.all([data1, data2])
        .then(function (result) {
          console.log(result);
          return res.send(result);
        })
        .catch(function (err) {
          return res.status(404).send(err);
        });
    } else {
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
    }
  },
  updateTableNo: function (req, res) {
    console.log(req.body);
    mongoose
      .startSession()
      .then(function (session) {
        session
          .withTransaction(function () {
            var bulkUpdatOpt = [
              {
                updateMany: {
                  filter: {
                    _id: req.body.outletId,
                  },
                  update: {
                    $set: {
                      "table.$[elem1].isAvailable": true,
                      "table.$[elem2].isAvailable": false,
                    },
                  },
                  arrayFilters: [
                    { "elem1.number": { $in: req.body.oldTables } },
                    { "elem2.number": { $in: req.body.newTables } },
                  ],
                },
              },
            ];

            var data1 = outletModel.bulkWrite(bulkUpdatOpt, { session });

            var data2 = orderModel.updateOne(
              { _id: req.body._id },
              {
                tableNumber: req.body.newTables,
              },
              {
                session,
              }
            );

            return Promise.all([data1, data2]);
          })
          .then(function (result) {
            console.log("commited", result);
            session.endSession();
            return res.send(result);
          })
          .catch(function (err) {
            console.log("aborted", err);
            session.endSession();
            return res.status(401).send(err);
          });
      })
      .catch(function (err) {
        return res.status(500).send({ error: "try later" });
      });
  },
};
