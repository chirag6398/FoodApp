var outletModel = require("../model/outlet.model");
var mongoose = require("mongoose");
module.exports = {
  getOutletAgentPage: function (req, res) {
    console.log(req.user);

    if (req.user.userType === "outletAgent") {
      return outletModel
        .findById({ _id: req.user.outlet._id })
        .then(function (result) {
          return res.send({ outlet: result, agent: req.user });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(500).send(err);
        });
      // outletModel
      // .aggregate([
      //   {
      //     $match: {
      //       _id: req.user.outlet._id,
      //     },
      //   },
      //   {
      //     $unwind: "$products",
      //   },
      //   {
      //     $group: {
      //       _id: "$products.product.category._id",
      //       name: { $first: "$products.product.category.name" },
      //       brandLogo: { $first: "$brand.logo" },
      //       products: { $push: "$products.product" },
      //     },
      //   },
      //   {
      //     $sort: { name: 1 },
      //   },
      // ])
      // .exec(function (err, result) {
      //   if (err) {
      //     console.log(err);
      //     return res.status(500).send({ error: err });
      //   } else {
      //     console.log("result", result);
      //     return res.status(200).send({product:result,admin:req.user});
      //   }
      // });

      return res.send(req.user);
    } else {
      return res.status(404).send({ message: "unauthorized" });
    }
  },
  getProductByName: function (req, res) {
    console.log(req.params.searchText, req.params._id);
    var regex = new RegExp(req.params.searchText, "i");
    var pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params._id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          products: 1,
        },
      },
      {
        $match: {
          "products.product.name": { $regex: regex },
        },
      },
    ];

    outletModel.aggregate(pipeline).exec(function (err, result) {
      console.log(err, result);
      if (result) return res.send(result);
      return res.status(404).send(err);
    });
  },
};
