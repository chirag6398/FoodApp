module.exports = {
  isSuperAdmin: function (req, res, next) {
    console.log("middleware", req.user);
    if (req.user.userType === "superAdmin") {
      next();
    } else {
      return res.status(401).send({ err: "unauthorized user" });
    }
  },
  isBrandAdmin: function (req, res, next) {
    if (req.user.userType === "brandAdmin") {
      next();
    } else {
      return res.status(401).send({ err: "unauthorized user" });
    }
  },
  isOutletAdmin: function (req, res, next) {
    if (req.user.userType === "outletAdmin") {
      next();
    } else {
      return res.status(401).send({ err: "unauthorized user" });
    }
  },
  isOutletAgent: function (req, res, next) {
    if (req.user.userType === "outletAgent") {
      next();
    } else {
      return res.status(401).send({ err: "unauthorized user" });
    }
  },
};
