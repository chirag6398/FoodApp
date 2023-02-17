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
    }).state("changePassword",{
        url:"/changepassword",
        templateUrl:"./templates/changePassword.html",
        controller:"changePasswordController"
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
    }).state("brandAdminOutlets",{
        url:"/brandadminoutlets",
        templateUrl:"./templates/brandAdminOutlets.html",
        controller:"brandAdminOutletsController"
    }).state("brandCategory",{
        url:"/brandadmincategory",
        templateUrl:"./templates/brandCategory.html",
        controller:"brandCategoryController"
    }).state("brandAdminCategory",{
        url:"/brandadmincategory",
        templateUrl:"./templates/brandAdminCategory.html",
        controller:"brandAdminCategoryController"
    }).state("categoryProduct",{
        url:"brandCategoryProduct/:id",
        templateUrl:"./templates/brandCategoryProduct.html",
        controller:"categoryProductController"
    }).state("outletAdmin",{
        url:"/outletadmin",
        templateUrl:"./templates/outletAdmin.html",
        controller:"outletAdminController"
    }).state("updateOutletAdmin",{
        url:"/updateOutletAdmin/:id",
        templateUrl:"./templates/updateOutletAdmin.html",
        controller:"updateOutletAdminController"
    })

    // $urlRouterProvider
    // .when('/brandcategoryproduct/:id', '/brandcategoryproduct/:id')
    

    // $urlRouterProvider.otherwise('/signup');
});
