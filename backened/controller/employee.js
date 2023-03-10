var employeeModel=require("../model/employee.model");
var bcrypt=require("bcrypt")

function hashPassword(password,next){

    bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError,null)
        } else {
            bcrypt.hash(password, salt, function(hashError, hash) {
            
            
            return next(null,hash);
           
            })
        }
        })

        
}


module.exports={
    logInHandler:function(req,res){
        
        if(req.user._doc===undefined){
            return res.status(req.user.status).send(req.user);
        }else{
            return res.status(200).send({user:req.user._doc,token:req.user.token});
        }
    },
    getUserById:function (req,res){
        employeeModel.findById({_id:req.params.id}).then(function(result){
            // console.log(result);
            return res.status(200).send(result);
        }).catch(function(err){
            // console.log(err);
            return res.status(500).send({message:"no user found"})
        })
    },
    getUsers:function(req,res){

        return employeeModel.find({
            userType:{$ne:"superAdmin"},
            isActive:true,
            isDeleted:false
        },
        {password:0,createdAt:0,updatedAt:0}
        ).then(function(result){
            
            return res.send(result);
        }).catch(function(err){
            
            return res.status(500).send(err);
        })
    },
    updateUser:function (req,res){

        
        employeeModel.findOneAndUpdate({_id:req.body.id},{
            userName:req.body.userName,
            firstName:req.body.firstName,
            email:req.body.email,
            number:req.body.number,
            lastName:req.body.lastName
        }).then(function(result){
            
            return res.status(200).send(result);
        }).catch(function(err){
           
            return res.status(400).send({message:"email id and username should be unique"})
        });

    },
    updatePassword:function(req,res){
        
        hashPassword(req.body.password,function(err,hashedPassword){
            
            if(err){
                return res.status(500).send({message:"internal error"});
            }else{
                employeeModel.findOneAndUpdate({_id:req.body.id},{password:hashedPassword}).then(function(result){
                    return res.send({message:"updated"});
                }).catch(function(err){
                    return res.status(500).send({error:err});
                })
            }
        })
        
        
    }

}
