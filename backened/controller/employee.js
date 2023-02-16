module.exports={
    logInHandler:function(req,res){
        console.log(req.user)
        if(req.user._doc===undefined){
            return res.status(req.user.status).send(req.user);
        }else{
            return res.status(200).send({user:req.user._doc,token:req.user.token});
        }
    }
}