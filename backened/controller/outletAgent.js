var outletModel=require("../model/outlet.model");

module.exports={
    getOutletAgentPage:function (req,res){
        console.log(req.user)
        if(req.user.userType==="outletAgent"){
            return res.send(req.user);
        }else{
            return res.status(404).send({message:"unauthorized"});
        }
    },
   
}