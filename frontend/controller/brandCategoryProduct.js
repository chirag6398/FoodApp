///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("categoryProductController",["$scope","$http","$location","apiHandler","$stateParams",function($scope,$http,$location,apiHandler,$stateParams){
    console.log($stateParams.id)
    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;
            $scope.brandId=result.data._id;
            $scope.categoryId=$stateParams.id;
            // apiHandler.getProductsByCategoryId(result.data._id,function(result){
            //     console.log(result.data);
            //     $scope.categories=result.data;
            // })

            
        }else{
            $location.path('login')
        }
    });
    $scope.btnText="Add product";
    $scope.product={};

    $scope.createProduct = function($event) {
        $event.preventDefault();
        var formData=new FormData();
        formData.append("name", $scope.product.productName);
        formData.append("file",$scope.product.image);
        formData.append('categoryId',$scope.categoryId);
        formData.append('brandId',$scope.brandId);
        formData.append('price',$scope.product.price);
        formData.append('description',$scope.product.description);
        alert("hi");
        $http.post('http://localhost:5000/api/product/addProduct', formData, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function(response) {
          console.log(response.data);
        }, function(error) {
          console.log(error);
        });
      };

   
}])



