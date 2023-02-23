var JWTStrategy=require("passport-jwt").Strategy;
var ExtractJWT=require("passport-jwt").ExtractJwt;
var employeeModel=require("../model/employee.model");

module.exports={
    initializer:function(passport){
        
        passport.use(new JWTStrategy({
            secretOrKey:process.env.SECRET_KEY,
            jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken()
        },function(jwt_payload,cb){
            console.log("hello",jwt_payload);

            employeeModel.findById({_id:jwt_payload._id},{createdAt:0,password:0,updatedAt:0}).then(function(user){
                if(user){

                    console.log("jwt passport",user)
                    return cb(null,user)
                }
                else
                    return cb(null,false);

            }).catch(function(err){
                return cb(err,false);
            });

        }))
    }
}