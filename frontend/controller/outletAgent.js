///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>
///<reference path="../services/cart.service.js"/>

function generateOrderId() {
    const timestamp = new Date().getTime(); 
    const randomNumber = Math.floor(Math.random() * 10000); 
    const orderId = "ORDERID-"+timestamp+"-"+randomNumber; 
    return orderId;
}

app.controller("outletAgentController",["$scope","$http","$location","apiHandler","cartService","$interval",function($scope,$http,$location,apiHandler,cartService,$interval){
    apiHandler.getOutletAgentPage(function(err,result){
        if(result){
            // console.log(result);
            $scope.outletId=result.data.outletId;
            $scope.admin={
                userName:result.data.userName,
                email:result.data.email,
                firstName:result.data.firstName,
                lastName:result.data.lastName,
                number:result.data.number
            }
            $scope.adminId=result.data._id;
            apiHandler.getOutletProducts($scope.outletId,function(err,result){
                // console.log(result);
                $scope.products=result.data;
            });

            apiHandler.getCategories($scope.outletId,function(err,result){
                // console.log(result.data);
                $scope.categories=result.data;
            })
            $interval(function() {
                $scope.getCurrentTime();
              }, 1000);
              
        }
    });
    
    $scope.getCurrentTime = function() {
        $scope.currentTime = new Date();
      };

    $scope.updateAdmin=function ($event,id){
        console.log(id);
        apiHandler.updateAdmin($scope.admin,id,function(result){
            console.log(result);
        })
    }

    $scope.changePassword=function($event,id){
        console.log(id);
        apiHandler.updatePassword($scope.admin,id,function(err,result){
            if(result){
                console.log(result)
            }
        })
    }

    // console.log($scope.search);
      
    $scope.orderNo=generateOrderId();
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
        $scope.orderBtn="placing..."
        console.log($scope.customer,$scope.object.cart);
        apiHandler.placeOrder($scope.customer,$scope.object.cart,$scope.orderNo,$scope.outletId,function(err,result){
            if(result){
                alert("order placed");
                $scope.orderNo=generateOrderId();
                $scope.object={cart:[]};
                $scope.saved=false;
                $scope.customer={};
            }
        });

    }
}])