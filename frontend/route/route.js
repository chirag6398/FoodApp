///<reference path="../module/module.js"/>

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "./templates/login.html",
      controller: "loginController",
    })
    .state("superAdmin", {
      url: "/superAdmin",
      templateUrl: "./templates/superAdmin.html",
      controller: "superAdminController",
      resolve: {
        data: function () {
          return "parentController Loaded";
        },
      },
    })
    .state("superAdmin.createBrand", {
      url: "/createBrand",
      templateUrl: "./templates/superAdminCreateBrand.html",
      controller: "superAdminCreateBrandController",
    })
    .state("superAdmin.users", {
      url: "/users",
      templateUrl: "./templates/superAdminUsers.html",
      controller: "superAdminUsersController",
    })
    .state("superAdmin.setting", {
      url: "/setting/:id",
      templateUrl: "./templates/superAdminSetting.html",
      controller: "superAdminSettingController",
      resolve: {
        data: function () {
          return "childController Loaded";
        },
      },
    })
    .state("superAdmin.analysis", {
      url: "/Analysis",
      templateUrl: "./templates/superAdminAnalysis.html",
      controller: "superAdminAnalysisController",
    })
    .state("superAdmin.outlets", {
      url: "/outlets",
      templateUrl: "./templates/superAdminOutlets.html",
      controller: "superAdminOutletsController",
    })
    .state("superAdmin.superCategories", {
      url: "/superCategories",
      templateUrl: "./templates/superAdminSuperCategories.html",
      controller: "superAdminSuperCategoriesController",
    })
    .state("updatebrandadmin", {
      url: "/superadmin/updatebrandadmin/:id",
      templateUrl: "./templates/updateBrandAdmin.html",
      controller: "updatebrandadminController",
    })
    .state("brandadmin", {
      url: "/brandadmin",
      templateUrl: "./templates/brandAdmin.html",
      controller: "brandAdminController",
    })
    .state("brandadmin.dashboard", {
      url: "/home",
      templateUrl: "./templates/brandAdminDashboard.html",
      controller: "brandAdminDashboardController",
    })
    .state("brandadmin.home", {
      url: "/home",
      templateUrl: "./templates/brandAdminHome.html",
      controller: "brandAdminHomeController",
    })
    .state("brandadmin.users", {
      url: "/brandadminusers",
      templateUrl: "./templates/brandAdminUsers.html",
      controller: "brandAdminUsersController",
    })
    .state("brandadmin.brandAdminCategory", {
      url: "/brandadmincategory",
      templateUrl: "./templates/brandAdminCreateSuperCategory.html",
      controller: "brandAdminCategoryController",
    })
    .state("brandadmin.categoryProduct", {
      url: "brandCategoryProduct/:id/:name",
      templateUrl: "./templates/brandCategoryProduct.html",
      controller: "categoryProductController",
    })
    .state("outletAdmin", {
      url: "/outletAdmin",
      templateUrl: "./templates/outletAdmin.html",
      controller: "outletAdminController",
      // redirectTo:"outletAdmin.products"
    })
    .state("updateOutletAdmin", {
      url: "/updateOutletAdmin/:id",
      templateUrl: "./templates/updateOutletAdmin.html",
      controller: "updateOutletAdminController",
    })
    .state("brandadmin.setting", {
      url: "/setting/:id",
      templateUrl: "./templates/brandSetting.html",
      controller: "brandSettingController",
    })
    .state("brandadmin.outletData", {
      url: "/outletData/:id",
      templateUrl: "./templates/brandAdminOutletData.html",
      controller: "brandAdminOutletDataController",
    })
    .state("delete", {
      url: "/delete/:id",
      templateUrl: "./templates/delete.html",
      controller: "deleteController",
    })
    .state("changePassword", {
      url: "/changePassword/:id",
      templateUrl: "./templates/changePassword.html",
      controller: "changePasswordController",
    })
    .state("updateSelf", {
      url: "/updateSelf/:id",
      templateUrl: "./templates/updateSelf.html",
      controller: "updateSelfController",
    })
    .state("outletAdmin.products", {
      url: "/products",
      templateUrl: "./templates/products.html",
      controller: "outletAdminProductsController",
    })
    .state("outletAdmin.outletBrandProducts", {
      url: "/brandProducts",
      templateUrl: "./templates/outletBrandProducts.html",
      controller: "brandProductsController",
    })
    .state("outletAdmin.employee", {
      url: "/addemployee",
      templateUrl: "./templates/outletEmployeeForm.html",
      controller: "outletEmployeeFormController",
    })
    .state("outletAdmin.outletAdminDashboard", {
      url: "/dashboard",
      templateUrl: "./templates/outletAdminDashboard.html",
      controller: "outletAdminDashboardController",
    })
    .state("outletAdmin.setting", {
      url: "/outletSetting",
      templateUrl: "./templates/outletAdminSetting.html",
      controller: "outletAdminSettingController",
    })
    .state("outletAgent", {
      url: "/outletAgent",
      templateUrl: "./templates/outletAgent.html",
      controller: "outletAgentController",
    })
    .state("outletAgentOrders", {
      url: "/orders",
      templateUrl: "./templates/outletAgentOrders.html",
      controller: "outletAgentOrdersController",
    })
    .state("brandadmin.subCategory", {
      url: "/outletSubCategory/:id/:name",
      templateUrl: "./templates/subCategory.html",
      controller: "subCategoryController",
    })
    .state("superAdmin.brandData", {
      url: "/brandData/:id",
      templateUrl: "./templates/superAdminBrandData.html",
      controller: "superAdminBrandDataController",
    });

  // $urlRouterProvider
  // .when('/brandcategoryproduct/:id', '/brandcategoryproduct/:id')

  // $urlRouterProvider.otherwise('/login');
});

// .state("brandadmin.brandCategory", {
//     url: "/brandadmincategory",
//     templateUrl: "./templates/brandCategory.html",
//     controller: "brandCategoryController",
//   })
