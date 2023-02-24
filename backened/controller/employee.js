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
        console.log(req.user)
        if(req.user._doc===undefined){
            return res.status(req.user.status).send(req.user);
        }else{
            return res.status(200).send({user:req.user._doc,token:req.user.token});
        }
    },
    getUserById:function (req,res){
        employeeModel.findById({_id:req.params.id}).then(function(result){
            console.log(result);
            return res.status(200).send(result);
        }).catch(function(err){
            console.log(err);
            return res.status(500).send({message:"no user found"})
        })
    },
    updateUser:function (req,res){

        console.log(req.body);
        employeeModel.findOneAndUpdate({_id:req.body.id},{
            userName:req.body.userName,
            firstName:req.body.firstName,
            email:req.body.email,
            number:req.body.number,
            lastName:req.body.lastName
        }).then(function(result){
            console.log(result);
            return res.status(200).send(result);
        }).catch(function(err){
            console.log(err);
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

// $2b$10$XviNIq.g2zTz6qcQ1ht8KOcz8T5tzFCb7e69lzCiwaFTI3DaQET7i