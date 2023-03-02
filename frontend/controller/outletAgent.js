///<reference path="../module/module.js"/>
///<reference path="../factory/apicall.js"/>
///<reference path="../services/cart.service.js"/>

function generateOrderId() {
    const timestamp = new Date().getTime(); 
    const randomNumber = Math.floor(Math.random() * 10000); 
    const orderId = "ORDERID-"+timestamp+"-"+randomNumber; 
    return orderId;
}

app.controller("outletAgentController",["$scope","$http","$location","outletAgentApi","cartService","$interval","$rootScope",function($scope,$http,$location,outletAgentApi,cartService,$interval,$rootScope){
    outletAgentApi.getOutletAgentPage();
    $scope.categories=[];
    $rootScope.$on('passData',function(err,result){
        if(result){
            
            $scope.outletId=result.data.outlet._id;
            $scope.admin={
                userName:result.data.userName,
                email:result.data.email,
                firstName:result.data.firstName,
                lastName:result.data.lastName,
                number:result.data.number
            }
            $scope.adminId=result.data._id;
            
          
           

            outletAgentApi.getOutletProducts($scope.outletId);
            
            
        }
    });

    $interval(function() {
        $scope.getCurrentTime();
      }, 1000);

   

    
    $rootScope.$on('agentProducts',function(err,result){
        console.log(result);

        if(result.data && result.data.length>0){
            result.data.forEach(function(value){
            
                $scope.categoryProducts={[value.name]:value.products};
                $scope.categories.push(value.name);
    
            })
            console.log($scope.categories);
            $scope.isSelected=0;
            $scope.products=$scope.categoryProducts[$scope.categories[$scope.isSelected]];
        }
        
        

    });

    $rootScope.$on('agentProductsError',function(err,result){
        console.log(result);  
    });

    $rootScope.$on('notEligible',function(err,isEligible){
        if(!isEligible){
            $location.path('login')
        }
    })

   
    
    $scope.getCurrentTime = function() {
        $scope.currentTime = new Date();
      };

    $scope.updateAdmin=function ($event,id){
        console.log(id);
        outletAgentApi.updateAdmin($scope.admin,id,function(result){
            console.log(result);
        })
    }

    $scope.changePassword=function($event,id){
        console.log(id);
        outletAgentApi.updatePassword($scope.admin,id,function(err,result){
            if(result){
                console.log(result)
            }
        })
    }

     
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
        
        console.log($scope.object.cart)
        
        
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
        outletAgentApi.placeOrder($scope.customer,$scope.object.cart,$scope.orderNo,$scope.outletId,function(err,result){
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