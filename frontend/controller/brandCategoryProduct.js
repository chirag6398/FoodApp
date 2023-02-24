///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>



app.controller("categoryProductController",["$scope","$http","$location","apiHandler","$stateParams",function($scope,$http,$location,apiHandler,$stateParams){
    console.log($stateParams.id,$stateParams.name);
    $scope.categoryName=$stateParams.name;

    apiHandler.getBrandAdminPage(function(result){
        if(result && result.status===200){
            $scope.brandName=result.data.brandName;
            $scope.brandId=result.data._id;
            $scope.categoryId=$stateParams.id;

            apiHandler.getProductsInBrand({categoryId:$scope.categoryId,brandId:$scope.brandId},function(result){
                console.log(result.data);
                $scope.products=result.data;
            })

            

            
        }else{
            $location.path('login')
        }
    });
    $scope.btnText="Add product";
    $scope.product={};

    $scope.setProduct=function(product){
      console.log(product)
      $scope.updateProduct={
        ...product
      };
    


    }

    $scope.updateProductHandler=function($event){
      $event.preventDefault();
      console.log($scope.updateProduct);

      var updatedFormData=new FormData();
        updatedFormData.append("name", $scope.updateProduct.name);
        updatedFormData.append("file",$scope.updateProduct.image);
        updatedFormData.append('categoryId',$scope.categoryId);
        updatedFormData.append('categoryName',$stateParams.name);
        updatedFormData.append('brandId',$scope.brandId);
        updatedFormData.append('price',$scope.updateProduct.price);
        updatedFormData.append('description',$scope.updateProduct.description);
        updatedFormData.append("_id",$scope.updateProduct._id);
        
        $http.post('http://localhost:5000/api/product/updateProduct', updatedFormData, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function(response) {
          console.log(response.data);
        }, function(error) {
          console.log(error);
        });
    }

    $scope.createProduct = function($event) {
        $event.preventDefault();
        var formData=new FormData();
        formData.append("name", $scope.product.productName);
        formData.append("file",$scope.product.image);
        formData.append('categoryId',$scope.categoryId);
        formData.append('categoryName',$stateParams.name);
        formData.append('brandId',$scope.brandId);
        formData.append('price',$scope.product.price);
        formData.append('description',$scope.product.description);
        
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



