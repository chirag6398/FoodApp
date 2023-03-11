var outletModel = require("../model/outlet.model");
var mongoose = require("mongoose");
module.exports = {
  getOutletAgentPage: function (req, res) {
    console.log(req.user);
    if (req.user.userType === "outletAgent") {
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
    // outletModel
    //   .find(
    //     {
    //       $and: [
    //         { _id: req.params._id },
    //         {
    //           products: {
    //             $elemMatch: {
    //               "product.name": "coca-cola",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       products: 1,
    //     }
    //   )
    //   .then(function (result) {
    //     console.log(result);
    //     return res.send(result);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //     return res.status(404).send(err);
    //   });
  },
};
