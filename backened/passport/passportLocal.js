var LocalStrategy=require("passport-local").Strategy;
var employeeModel=require("../model/employee.model");
var bcrypt=require("bcrypt");
var jwt=require("jsonwebtoken")

module.exports={
    initializer:function(passport){


        passport.use(new LocalStrategy(function(username,password,next){
            
            console.log(username,password)
            employeeModel.findOne({$or:[{email:username},{userName:username}]}).then(function(user){
                
                if(user){
                    
                    bcrypt.compare(password,user.password).then(function(match){
                        if(match){
                            const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY);
                            
                            console.log(token)
                            var nuser={
                                ...user,
                                token
                            }
                            console.log("user login",nuser)
                            
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
                        console.log(err);
                        next(null,{message:"internal server error",status:500});
                    });
                }
        ));
    }
           
        
    

   
}