///<reference path="../module/module.js"/>

app.service("outletAdminService", function (outletApi, $stateParams) {
  this.getSuperCategories = function (id, cb) {
    outletApi.getSuperCategories(id, cb);
  };

  this.getSubCategory = function (id, cb) {
    outletApi.getSubCategory(id, cb);
  };

  this.getProducts = function (categoryId, outletId, cb) {
    outletApi.getProductByCategory({ categoryId, outletId }, cb);
  };

  this.createOutletAgent = function (agent, outlet, cb) {
    outletApi.createOutletAgent(
      {
        ...agent,
        brand: outlet.brand,
        outlet: {
          _id: outlet._id,
          type: outlet.type,
          name: outlet.name,
        },
      },
      cb
    );
  };

  this.getOutletAgentEmployees = function (id, cb) {
    outletApi.getOutletAgentEmployees(id, cb);
  };

  this.addTax = function (id, tax, cb) {
    outletApi.addTax({ _id: id, tax: tax }, cb);
  };

  this.saveTableView = function (id, tables, cb) {
    outletApi.saveTableView({ _id: id, tables: tables }, cb);
  };

  this.addProductToOutlet = function (product, outletId, cb) {
    outletApi.addProductToOutlet(product, outletId, cb);
  };

  this.isExistTable = function (table, tables) {
    var ind = tables.findIndex(function (value) {
      return +value.number === table.number;
    });
    console.log(table, tables, ind);
    return ind >= 0;
  };
});
