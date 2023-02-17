var employeeModel=require("../model/employee.model");

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
            return res.status(500).send({message:"no user found"})
        });

    },

}