///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>
///<reference path="../services/cart.service.js"/>


app.controller("outletAgentController",["$scope","$http","$location","apiHandler","cartService",function($scope,$http,$location,apiHandler,cartService){
    apiHandler.getOutletAgentPage(function(err,result){
        if(result){
            // console.log(result);
            $scope.outletId=result.data.outletId;

            apiHandler.getOutletProducts($scope.outletId,function(err,result){
                // console.log(result);
                $scope.products=result.data;
            });

            apiHandler.getCategories($scope.outletId,function(err,result){
                // console.log(result.data);
                $scope.categories=result.data;
            })
            
        }
    });

    $scope.orderNo="OrderId:"+(new Date().getSeconds())
    $scope.customer={}
    $scope.amount=0;
    $scope.btnText="Enter";
    $scope.orderBtn="placed order"
    $scope.saved=false;
    $scope.object={cart:[]};

    $scope.saveCustomerData=function()
    {
        $scope.btnText="saved";
        $scope.saved=true;
        console.log($scope.customer);
    }
    $scope.addToCart=function(product){
        
        
        $scope.object.cart=cartService.addToCart($scope.object.cart,product);

        $scope.amount=cartService.totalPrice($scope.object.cart);
        
        
        
    }
    $scope.plus=function(product){
        $scope.object.cart=cartService.addToCart($scope.object.cart,product);

        $scope.amount=cartService.totalPrice($scope.object.cart);
        
    }

    $scope.minus=function(product){
        $scope.object.cart=cartService.removeFromCart($scope.object.cart,product);

        $scope.amount=cartService.totalPrice($scope.object.cart);
        
    }

    $scope.orderHandler=function(){

    }
}])