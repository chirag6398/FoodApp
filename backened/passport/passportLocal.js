var LocalStrategy=require("passport-local").Strategy;
var employeeModel=require("../model/employee.model");
var bcrypt=require("bcrypt");
var jwt=require("jsonwebtoken")
var brandModel=require("../model/brand.model");
var outletModel=require("../model/outlet.model");


module.exports={
    initializer:function(passport){


        passport.use(new LocalStrategy(function(username,password,next){
            
            console.log(username,password)
            employeeModel.findOne({$or:[{email:username},{userName:username}]}).then(function(user){
                
                if(user){

                    // console.log("check various level for successful login",user);
                    //brandId and isActive self and isDeleted Self for brandAdmin
                    //outletId existence and above
                    
                    
                    
                    
                    bcrypt.compare(password,user.password).then(function(match){
                        if(match){
                            if(user.isActive==false || user.isDeleted==true){
                                next(null,{message:"user does not exist",status:404});
                            }

                            brandModel.findOne({_id:user.brandId}).then(function(result){
                                if(result.isActive==false || result.isDeleted==true){
                                    next(null,{message:"user does not exist",status:404});
                                }else{
                                    if(user.userType=="outletAdmin" || user.userType=="outletAgent"){
                                        outletModel.findOne({_id:user.outletId}).then(function(result){
                                            if(result.isActive==false || result.isDeleted==true){
                                                next(null,{message:"user does not exist",status:404});
                                            }
                                        }).catch(function(err){
                                            next(null,{message:"try later",status:500});
                                        })
                                    }
                                } 
                            }).catch(function(err){
                                next(null,{message:"try later",status:500});
                            })

                            const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY);
                            
                            // console.log(token)
                            var nuser={
                                ...user,
                                token
                            }
                            // console.log("user login",nuser)
                            
                            next(null,nuser);
                           
                        }else{
                            next(null,{message:"password is wrong",status:401});
                        }
                    })
                    }else{
                        next(null,{message:"user does not exist",status:404});
                    }
                    })
                    .catch(function(err){
                        // console.log(err);
                        next(null,{message:"internal server error",status:500});
                    });
                }
        ));
    }
           
        
    

   
}