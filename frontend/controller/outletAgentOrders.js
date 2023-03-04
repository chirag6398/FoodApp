///<reference path="../module/module.js"/>



app.controller("outletAgentOrdersController",["$scope","$http","$location","outletAgentApi","cartService","$interval","$rootScope",function($scope,$http,$location,outletAgentApi,cartService,$interval,$rootScope){
   
    outletAgentApi.getOutletAgentPage();
    $rootScope.$on('passData',function(err,result){
        if(result){
            outletAgentApi.getOrders(result.data.outlet._id,function(err,result){
                console.log(result);
                $scope.orders=result.data;
                $scope.orders.forEach(function(value){
                    value.totalQuantity=value.items.reduce(function(accum,value){
                        return accum+value.quantity;
                    },0)
                    value.totalPrice=value.items.reduce(function(accum,value){
                        return (accum+(value.quantity*value.price));
                    },0)

                });
                console.log($scope.orders);
            });
        }
    });

    $scope.setData=function(items,customer,amount){
        $scope.items=items;
        $scope.amount=amount;
        $scope.customer=customer;
    }
    
}])