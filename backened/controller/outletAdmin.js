var outletModel=require("../model/outlet.model");
var brandModel=require("../model/brand.model");
module.exports={
    getAdminPage:function (req,res){
        if(req.user.userType==="outletAdmin"){
            outletModel.findById({_id:req.user.outletId}).then(function(result){
                // console.log(result);


                return brandModel.findById({_id:result.brandId},{brandLogo:1}).then(function(brand){
                    console.log("brand outletadmin id",brand);
                    return res.status(200).send({outletData:result,outletAdminData:req.user,brandLogo:brand.logo,brandId:brand._id});
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).send({status:500,message:"try later"});
                })

                // return res.status(200).send({outletData:result,outletAdminData:req.user});
            }).catch(function(err){
                console.log(err);
                return res.status(500).send({status:500,message:"try later"});
            })
        }
    },
    getProductsByCategory:function (req,res){

    },
    
}