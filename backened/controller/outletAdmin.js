var outletModel=require("../model/outlet.model");

module.exports={
    getOutletPageByOutletId:function (req,res){
        if(req.user.userType==="outletAdmin"){
            outletModel.findById({_id:req.user.outletId}).then(function(result){
                console.log(result);
                return res.status(200).send(result);
            }).catch(function(err){
                console.log(err);
                return res.status(500).send({status:500,message:"try later"});
            })
        }
    },
    getProductsByCategory:function (req,res){

    },
    
}