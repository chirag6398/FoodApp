
///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("subCategoryController",["$scope","$http","$location","brandApi","$rootScope","$stateParams",function($scope,$http,$location,brandApi,$rootScope,$stateParams){
    //    console.log($rootScope.outletId);

     brandApi.getBrandAdminPage(function(err,result){
        if(result){
            $scope.brandName=result.data.name;
            $scope.brandId=result.data._id;
            $scope.brandLogo=result.data.logo;
            console.log(result.data);

            brandApi.getCategoryByBrandId(result.data._id,$stateParams.id,function(err,result){
                if(result){
                    console.log(result);
                    console.log(result.data);
                    $scope.categories=result.data;
                }
                
            })

            
        }else{
            $location.path('login')
        }
    });
    $scope.category={};
    $scope.btnText="Add Sub Category";
    $scope.addCategory=function($event){
        $event.preventDefault();
        $scope.btnText="adding...";

        // console.log($scope.category,$stateParams.id,$stateParams.name)
        brandApi.addCategory({...$scope.category,brand:{_id:$scope.brandId,name:$scope.brandName},superCategory:{_id:$stateParams.id,name:$stateParams.name}},function(err,result){
            console.log(result);
            if(result){
                $scope.btnText="added";
            }
            
        })
        
    }
    $scope.setData=function(category){
        $scope.category=category;
    }
    $scope.updateCategory=function($event){
        $event.preventDefault();
        console.log($scope.category);
        var formData=new FormData();

        formData.append("name",$scope.category.name);
        formData.append("file",$scope.category.logo);
        formData.append("_id",$scope.category._id);

        $http.post('http://localhost:5000/api/brandAdmin/updateCategory', formData, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function(response) {
          console.log(response.data);
        }, function(error) {
          console.log(error);
        });
    }
}])
    
