///<reference path="../module/module.js"/>

app.factory("apiHandler",function($http){
    var obj={};

    obj.postLogin=function(data,cb){
        $http.post("http://localhost:5000/api/employee/login",{username:data.userName,password:data.password}).then(function(response){
            console.log(response);
            cb({token:response.data.token,userType:response.data.user.userType,status:200});
        }),function(err){
            
            console.log(err);
            if(err.status===401){
               
                cb({message:"please enter correct username and password",status:err.status})
            }else{
                
                cb({message:"please try againg later",status:500});
    
            }
        }
    }

    obj.getAdminPage=function(cb){
        $http.get("http://localhost:5000/api/superAdmin/getAdminPage").then(function(response){
            
            cb(response);
        }),function(err)
        {
            console.log(err);
            cb({status:401,message:"unauthorized"});
        }
    }

    obj.getBrands=function(cb){
        $http.get("http://localhost:5000/api/superAdmin/getBrands").then(function(response){
            console.log(response.data)
            cb(response.data);
        }),function(err)
        {
            console.log(err);
            cb({status:401,message:"unauthorized"});
        }
    }

    obj.createBrand=function(data,cb){
        
        $http.post("http://localhost:5000/api/superAdmin/createBrand",{brandName:data.name}).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }
    
    obj.postAddBrandAdmin=function(data,cb){
        $http.post("http://localhost:5000/api/superAdmin/addBrandAdmin",data).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }

    obj.getBrandAdminPage=function(cb){
        $http.get("http://localhost:5000/api/brandAdmin/getBrandAdminPage").then(function(response){
            console.log(response)
            cb(response.data);
        }),function(err)
        {
            console.log(err);
            cb({status:401,message:"unauthorized"});
        }
    }

    obj.createOutlet=function(outletData,brandId,cb){
        var data={
            ...outletData,
            id:brandId
        }
        console.log(data);
        $http.post("http://localhost:5000/api/brandAdmin/createOutlet",data).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }

    obj.getOutletsByBrandId=function(id,cb){
        $http.get("http://localhost:5000/api/brandAdmin/getOutlets/"+id).then(function(response){
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
        $http.post("http://localhost:5000/api/brandAdmin/createOutletAdmin",data).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }

    }

    obj.getCategoryByBrandId=function(id,cb){
        console.log(id);
        $http.get("http://localhost:5000/api/brandAdmin/getCategory/"+id).then(function(response){
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
        $http.post("http://localhost:5000/api/brandAdmin/addCategory",data).then(function(response){
            console.log(response);
            cb(response);
        }),function(err){
            cb(err);
        }
    }

    return obj;
})