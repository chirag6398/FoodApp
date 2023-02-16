///<reference path="../module/module.js"/>

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'./templates/login.html',
        controller:"loginController"
    }).state('superAdmin',{
        url:'/superadmin',
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
        url:"/superadmin/updatebrandadmin",
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
    }).state("brandAdminProducts",{
        url:"/brandadminproducts",
        templateUrl:"./templates/brandAdminProduct.html",
        controller:"brandAdminProductController"
    })

    // $urlRouterProvider
    // .when('/resetPassword/:resetToken', '/resetPassword/:resetToken')
    

    // $urlRouterProvider.otherwise('/signup');
});
