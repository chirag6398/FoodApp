///<reference path="../module/module.js"/>

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'./templates/login.html',
        controller:"loginController"
    }).state('superAdmin',{
        url:'/superAdmin',
        templateUrl:'./templates/superAdmin.html',
        controller:"superAdminController",
        resolve:{
            data: function() {
                return 'parentController Loaded';
            }
        }
    }).state('superAdmin.createBrand',{
        url:'/createBrand',
        templateUrl:'./templates/superAdminCreateBrand.html',
        controller:"superAdminCreateBrandController"
    }).state("superAdmin.users",{
        url:'/users',
        templateUrl:'./templates/superAdminUsers.html',
        controller:"superAdminUsersController"
    }).state("superAdmin.setting",{
        url:'/setting/:id',
        templateUrl:'./templates/superAdminSetting.html',
        controller:"superAdminSettingController",
        resolve:{
            data: function() {
                return 'childController Loaded';
            }
        }
    }).state("superAdmin.analysis",{
        url:"/Analysis",
        templateUrl:"./templates/superAdminAnalysis.html",
        controller:"superAdminAnalysisController"
    }).state("updatebrandadmin",{
        url:"/superadmin/updatebrandadmin/:id",
        templateUrl:"./templates/updateBrandAdmin.html",
        controller:"updatebrandadminController"
    }).state("brandadmin",{
        url:"/brandadmin",
        templateUrl:"./templates/brandAdmin.html",
        controller:"brandAdminController"
    }).state("brandadmin.home",{
        url:"/home",
        templateUrl:"./templates/brandAdminHome.html",
        controller:"brandAdminHomeController"
    }).state("brandadmin.outlets",{
        url:"/brandadminoutlets",
        templateUrl:"./templates/brandAdminOutlets.html",
        controller:"brandAdminOutletsController"
    }).state("brandadmin.brandCategory",{
        url:"/brandadmincategory",
        templateUrl:"./templates/brandCategory.html",
        controller:"brandCategoryController"
    }).state("brandadmin.brandAdminCategory",{
        url:"/brandadmincategory",
        templateUrl:"./templates/brandAdminCategory.html",
        controller:"brandAdminCategoryController"
    }).state("categoryProduct",{
        url:"brandCategoryProduct/:id/:name",
        templateUrl:"./templates/brandCategoryProduct.html",
        controller:"categoryProductController"
    }).state("outletAdmin",{
        url:"/outletAdmin",
        templateUrl:"./templates/outletAdmin.html",
        controller:"outletAdminController",
        // redirectTo:"outletAdmin.products"
    }).state("updateOutletAdmin",{
        url:"/updateOutletAdmin/:id",
        templateUrl:"./templates/updateOutletAdmin.html",
        controller:"updateOutletAdminController"
    }).state("brandadmin.setting",{
        url:"/setting/:id",
        templateUrl:"./templates/brandSetting.html",
        controller:"brandSettingController"
    }).state("delete",{
        url:"/delete/:id",
        templateUrl:"./templates/delete.html",
        controller:"deleteController"
    }).state("changePassword",{
        url:"/changePassword/:id",
        templateUrl:"./templates/changePassword.html",
        controller:"changePasswordController"
    }).state("updateSelf",{
        url:"/updateSelf/:id",
        templateUrl:"./templates/updateSelf.html",
        controller:"updateSelfController"
    }).state("outletAdmin.products",{
        url:"/products",
        templateUrl:"./templates/products.html",
        controller:"outletAdminProductsController"
    }).state("outletAdmin.outletBrandProducts",{
        url:"/brandProducts/:id",
        templateUrl:"./templates/brandProducts.html",
        controller:"brandProductsController"
    }).state("outletAdmin.employee",{
        url:"/addemployee",
        templateUrl:"./templates/outletEmployeeForm.html",
        controller:"outletEmployeeFormController"
    }).state("outletAgent",{
        url:"/outletAgent",
        templateUrl:"./templates/outletAgent.html",
        controller:"outletAgentController"
    }).state("subCategory",{
        url:"/outletSubCategory/:id/:name",
        templateUrl:"./templates/outletSubCategory.html",
        controller:"subCategoryController"
    })

    // $urlRouterProvider
    // .when('/brandcategoryproduct/:id', '/brandcategoryproduct/:id')
    

    // $urlRouterProvider.otherwise('/login');
});
