///<reference path="../module/module.js"/>

app.factory("apiHandler",function($http){
    var obj={};

    obj.postLogin=function(data,cb){
        $http.post("http://localhost:5000/api/employee/login",{username:data.userName,password:data.password}).then(function(response){
            console.log(response);
            cb({token:response.data.token,userType:response.data.user.userType,admin:response.data.user,status:200});
        }).catch(function(err){
            
            console.log(err);
            if(err.status===401){
               
                cb({message:"please enter correct username and password",status:err.status})
            }else{
                
                cb({message:"please try againg later",status:500});
    
            }
        })
    }

    obj.getOutletAdminPage=function(cb){
        $http.get("http://localhost:5000/api/outletAdmin/getAdminPage",{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            
            cb(response);
        }).catch(function(err){
            console.log(err);
            cb({status:401,message:"unauthorized user"});
        })
    }

    obj.getAdminPage=function(cb){
        $http.get("http://localhost:5000/api/superAdmin/getAdminPage",{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            
            cb(response);
        }).catch(function(err){
            console.log(err);
            cb({status:401,message:"unauthorized user"});
        })
    }

    obj.getBrands=function(cb){
        $http.get("http://localhost:5000/api/superAdmin/getBrands",{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response.data)
            cb(response.data);
        }),function(err)
        {
            console.log(err);
            cb({status:401,message:"unauthorized"});
        }
    }

    obj.createBrand=function(data,cb){
        
        $http.post("http://localhost:5000/api/superAdmin/createBrand",{brandName:data.name},{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }
    
    obj.postAddBrandAdmin=function(data,cb){
        $http.post("http://localhost:5000/api/superAdmin/addBrandAdmin",data,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }

    obj.getBrandAdminPage=function(cb){
        $http.get("http://localhost:5000/api/brandAdmin/getBrandAdminPage",{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response)
            cb(response.data);
        }).catch(function(err){
            console.log(err);
            cb({status:401,message:"unauthorized user"});
        })
    }

    obj.createOutlet=function(outletData,brandId,cb){
        var data={
            ...outletData,
            id:brandId
        }
        console.log(data);
        $http.post("http://localhost:5000/api/brandAdmin/createOutlet",data,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }

    obj.getOutletsByBrandId=function(id,cb){
        $http.get("http://localhost:5000/api/brandAdmin/getOutlets/"+id,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response.data);
        }).catch(function(err){
            console.log(err);
        })
    }

    obj.createOutletAdmin=function(outletAdminData,id,cb){
        var data={
            ...outletAdminData,
            id:id
        };
        console.log(data)
        $http.post("http://localhost:5000/api/brandAdmin/createOutletAdmin",data,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }

    }

    obj.getCategoryByBrandId=function(id,cb){
        console.log(id);
        $http.get("http://localhost:5000/api/brandAdmin/getCategory/"+id,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }).catch(function(err){
            console.log(err);
        })
    }

    obj.addCategory=function(category,id,cb){
        var data={
            ...category,
            id:id
        }
        $http.post("http://localhost:5000/api/brandAdmin/addCategory",data,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }

    obj.getUserById=function(id,cb){
        $http.get("http://localhost:5000/api/employee/getUserById/"+id,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            console.log(err);
            cb(err);
        }
    }

    obj.updateAdmin=function (admin,id,cb){
        var data={
            ...admin,
            id:id
        }
        $http.post("http://localhost:5000/api/employee/updateUser",data,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }).catch(function(err){
            console.log(err);
        })
    }

    obj.getProductsInBrand=function(data,cb){
        $http.post("http://localhost:5000/api/product/getProducts",data,{
            headers:{
                "Authorization":window.localStorage.getItem("Authorization")
            }
        }).then(function(response){
            console.log(response);
            cb(response);
        }).catch(function(err){
            console.log(err);
        })
    }

    return obj;
})