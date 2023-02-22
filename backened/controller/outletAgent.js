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
    getCategories:function (req,res){
        console.log(req.params.id)
        outletModel.distinct('products.product.categoryName',{_id:req.params.id}).then(function(result){
            console.log(result);
            return res.send(result);
        }).catch(function(err){
            console.log(err);
            return res.status(500).send({error:err});
        })
    }
}