///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("superAdminController",["$scope","$http","$location","apiHandler","adminApi","$state","$rootScope",function($scope,$http,$location,apiHandler,adminApi,$state,$rootScope){
    adminApi.getAdminPage();

    $rootScope.$on('passData',function(err,data){
        console.log(data);
        $scope.superAdmin=data;
    });

    $rootScope.$on('notEligible',function(err,isEligible){
        if(!isEligible){
            $location.path('login');
        }
    })
   
    
    $scope.createBrand=function($event){
        $event.preventDefault();
        $scope.btnText="creating...";
       
        apiHandler.createBrand($scope.brand,function(result){
            console.log("result",result);
            if(result.status===200){
                $scope.btnText="created";
                
            }
          
        })
    }


    
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");
    
    sidebarBtn.addEventListener("click", ()=>{
        sidebar.classList.toggle("close");
    });
}])