var orderModel = require("../model/order.model");
var mongoose = require("mongoose");
var outletModel = require("../model/outlet.model");
var moment = require("moment");
var startDate = moment().subtract(1, "month").toDate();
var endDate = moment().toDate();
var io = require("../middleware/socketIoMiddleware").getIo();
module.exports = {
  createOrder: function (req, res) {
    var body = req.body;

    var order = undefined;
    if (body.type === "dine-in") {
      order = new orderModel({
        customer: body.customer,
        items: body.item,
        outlet: body.outlet,
        orderId: body.orderId,
        tableNumber: body.allotedTables,
        type: body.type,
        status: "pending",
        brand: body.brand,
      });

      var data1 = order.save();
      var data2 = outletModel.updateOne(
        { _id: body.outlet._id },
        { $set: { "table.$[elem].isAvailable": false } },
        {
          new: true,
          arrayFilters: [{ "elem.number": { $in: body.allotedTables } }],
        }
      );

      Promise.all([data1, data2])
        .then(function (result) {
          socket.emit("outlet" + result.outlet._id, result);
          return res.send(result);
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ message: "internal server error" });
        });
    } else {
      order = new orderModel({
        customer: body.customer,
        items: body.item,
        outlet: body.outlet,
        orderId: body.orderId,
        type: body.type,
        status: "pending",
        brand: body.brand,
      });

      var data1 = order.save();

      Promise.all([data1])
        .then(function (result) {
          io.sockets.emit(result[0].outlet._id, result[0]);

          return res.send(result);
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send({ message: "internal server error" });
        });
    }
  },
  getOrders: function (req, res) {
    var query = req.query;
    var limit = query.limit || 10;
    var pageNo = query.pageNo || 1;
    var skipNo = (pageNo - 1) * limit;
    var date = moment().startOf("day");
    // console.log(date);
    var filter = {
      $and: [
        { "outlet._id": mongoose.Types.ObjectId(query.outletId) },
        { createdAt: { $gte: date } },
        { status: query.status },
        { type: query.type },
      ],
    };
    orderModel
      .find(filter)
      // .skip(skipNo)
      // .limit(limit)
      .sort({ createdAt: -1 })
      .then(function (result) {
        orderModel.countDocuments(filter, function (err, count) {
          return res.status(200).send({ result, count });
        });
        // return res.send(result);
      })
      .catch(function (err) {
        console.log(err);

        return res.status(500).send({ message: "internal server error" });
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
