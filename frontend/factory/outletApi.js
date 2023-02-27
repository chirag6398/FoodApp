///<reference path="../module/module.js"/>

app.factory("outletApi",function($http){
    var obj={};

     obj.getOutletAdminPage=function(cb){
        $http.get("http://localhost:5000/api/outletAdmin/getAdminPage",{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            
            cb(null,response);
        }).catch(function(err){
            // console.log(err);
            cb({status:401,message:"unauthorized user"},null);
        })
    }

    obj.createOutletAgent=function(data,cb){
        console.log(data);
        $http.post("http://localhost:5000/api/outletAdmin/createOutletAgent",data,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            cb(null,response);
        }).catch(function(err){
            
            // console.log(err,null);
            cb(err,null)
        })
    }

    // obj.postLogin=function(data,cb){
    //     $http.post("http://localhost:5000/api/employee/login",{username:data.userName,password:data.password}).then(function(response){
           
    //         cb(null,{token:response.data.token,userType:response.data.user.userType,admin:response.data.user,status:200});
    //     }).catch(function(err){
            
            
    //         if(err.status===401){
               
    //             cb({message:"please enter correct username and password",status:err.status},null)
    //         }else{
                
    //             cb({message:"please try againg later",status:500},null);
    
    //         }
    //     })
    // }

   

    // obj.getAdminPage=function(cb){
    //     $http.get("http://localhost:5000/api/superAdmin/getAdminPage",{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
            
    //         cb(response);
    //     }).catch(function(err){
    //         // console.log(err);
    //         cb({status:401,message:"unauthorized user"});
    //     })
    // }

    

   
    
  

    

    

    

  

    // obj.getCategoryByBrandId=function(brandId,superCategoryId,cb){
    //     var data={
    //         brandId,
    //         superCategoryId
    //     }
    //     $http.post("http://localhost:5000/api/brandAdmin/getCategory/",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(response);
    //     }).catch(function(err){
    //         // console.log(err);
    //     })
    // }

    // obj.addCategory=function(category,brandId,superCategoryId,superCategoryName,cb){
    //     var data={
    //         ...category,
    //         brandId,
    //         superCategoryId,
    //         superCategoryName
    //     }
    //     // console.log(data)
    //     $http.post("http://localhost:5000/api/brandAdmin/addCategory",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(response);
    //     }),function(err){
    //         cb(err);
    //     }
    // }

   

    

    // obj.updatePassword=function (admin,id,cb){
    //     var data={
    //         ...admin,
    //         id:id
    //     }
    //     $http.post("http://localhost:5000/api/employee/updatePassword",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(null,response);
    //         cb(null,response);
    //     }).catch(function(err){
    //         // console.log(err,null);
    //     })
    // }

    // obj.getProductsInBrand=function(data,cb){
    //     $http.post("http://localhost:5000/api/product/getProducts",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(response);
    //     }).catch(function(err){
    //         // console.log(err);
    //     })
    // }

    

    // obj.getBrandOutletProducts=function(data,cb){
    //     $http.post("http://localhost:5000/api/outlet/brandProducts",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         cb(response);
    //     }).catch(function(err){
            
    //         // console.log(err);
    //     })
    // }

    // obj.getProductByCategory=function(data,cb){
    //     // console.log(data)
    //     $http.post("http://localhost:5000/api/outlet/categoryProduct",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         cb(response);
    //     }).catch(function(err){
            
    //         // console.log(err);
    //     })
    // }

    // obj.addProductToOutlet=function(product,outletId,cb){
    //     var data={
    //         ...product,
    //         outletId
    //     }
    //     // console.log(data);
    //     $http.post("http://localhost:5000/api/outlet/addProductToOutlet",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         cb(null,response);
    //     }).catch(function(err){
            
    //         // console.log(err,null);
    //     })
    // }

    // obj.getOutletProducts=function(id,cb){
    //     // console.log(id);
    //     $http.get("http://localhost:5000/api/outlet/getProduct/"+id,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response)
    //         cb(null,response);
    //     }).catch(function(err){
    //         // console.log(err);
    //         cb(err,null);
    //     })
    // }

    // obj.removeOutletProduct=function(product,outletId,cb){
    //     var data={
    //         ...product,
    //         outletId
    //     };

    //     $http.post("http://localhost:5000/api/outlet/removeOutletProduct",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         cb(null,response);
    //     }).catch(function(err){
            
    //         // console.log(err,null);
    //     })


    // }

    // obj.deactivateBrand=function(brandId,cb){
    //     $http.post("http://localhost:5000/api/superAdmin/deactivateBrand",{brandId},{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         cb(null,response);
    //     }).catch(function(err){
            
    //         // console.log(err,null);
    //     })
    // }
    // obj.activateBrand=function(brandId,cb){
    //     $http.post("http://localhost:5000/api/superAdmin/activateBrand",{brandId},{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         cb(null,response);
    //     }).catch(function(err){
            
    //         // console.log(err,null);
    //     })
    // }

    // obj.createOutletAgent=function(data,cb){
    //     // console.log(data);
    //     $http.post("http://localhost:5000/api/outletAdmin/createOutletAgent",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         cb(null,response);
    //     }).catch(function(err){
            
    //         // console.log(err,null);
    //     })
    // }

    // obj.getOutletAgentPage=function(cb){
    //     $http.get("http://localhost:5000/api/outletAgent/getOutletAgentPage",{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response)
    //         cb(null,response);
    //     }).catch(function(err){
    //         // console.log(err);
    //         cb(err,null);
    //     })
    // }

    // obj.addSuperCategory=function(superCategory,brandId,cb){
    //     var data={
    //         ...superCategory,
    //         brandId
    //     }
    //     $http.post("http://localhost:5000/api/brandAdmin/addSuperCategory",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(null,response);
    //     }),function(err){
    //         cb(err,null);
    //     }
    // }

    // obj.getSuperCategoryByBrandId=function(id,cb){
    //     console.log(id)
    //     $http.get("http://localhost:5000/api/brandAdmin/getSuperCategory/"+id,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(null,response);
    //     }).catch(function(err){
    //         // console.log(err,null);
    //     })
    // }

    // obj.getCategories=function(outletId,cb){
    //     console.log(outletId)
    //     $http.get("http://localhost:5000/api/outletAgent/getCategories/"+outletId,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(null,response);
    //     }).catch(function(err){
    //         // console.log(err,null);
    //     })
    // }

    // obj.placeOrder=function(customer,cart,orderNo,outletId,cb){
    //     var data={
    //         ...customer,
    //         item:cart,
    //         orderId:orderNo,
    //         outletId
    //     }
        
    //     $http.post("http://localhost:5000/api/order/createOrder",data,{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(null,response);
    //     }),function(err){
    //         cb(err,null);
    //     }
        
    // }

    // obj.togleOutlet=function(outletId,cb){

    //     $http.post("http://localhost:5000/api/outlet/togleOutlet",{outletId},{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
    //         // console.log(response);
    //         cb(null,response);
    //     }),function(err){
    //         cb(err,null);
    //     }
    // }

    // obj.deleteBrand=function(brandId,cb){
    //     console.log(brandId);
    //     $http.post("http://localhost:5000/api/superAdmin/deleteBrand",{brandId},{
    //         headers:{
    //             "Authorization":window.localStorage.getItem("Authorization")
    //         }
    //     }).then(function(response){
            
    //         cb(null,response);
    //     }),function(err){
    //         cb(err,null);
    //     }
    // }

    // obj.getUsers=function(cb){
    //     $http.get("http://localhost:5000/api/employee/getUsers").then(function(response){
    //         cb(null,response);
    //     }).catch(function(err){
    //         cb(err,null);
    //     })
    // }
    

    return obj;
})