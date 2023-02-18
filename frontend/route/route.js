///<reference path="../module/module.js"/>

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'./templates/login.html',
        controller:"loginController"
    }).state('superAdmin',{
        url:'/superAdmin',
        templateUrl:'./templates/superAdmin.html',
        controller:"superAdminController"
    }).state("superAdminBrandNames",{
        url:'/superAdmin/BrandNames',
        templateUrl:'./templates/superAdminBrandNames.html',
        controller:"superAdminBrandNamesController"
    }).state("superAdminAnalysis",{
        url:"/superAdmin/Analysis",
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
        url:"brandCategoryProduct/:id",
        templateUrl:"./templates/brandCategoryProduct.html",
        controller:"categoryProductController"
    }).state("outletAdmin",{
        url:"/outletAdmin",
        templateUrl:"./templates/outletAdmin.html",
        controller:"outletAdminController"
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
    }).state("outletAdmin.availableProducts",{
        url:"/brandProducts/:id",
        templateUrl:"./templates/brandProducts.html",
        controller:"brandProductsController"
    })

    // $urlRouterProvider
    // .when('/brandcategoryproduct/:id', '/brandcategoryproduct/:id')
    

    // $urlRouterProvider.otherwise('/signup');
});
