var brandModel=require("../model/brand.model");
var outletModel=require("../model/outlet.model");
var validation=require("../service/validation.service");
var employeeModel=require("../model/employee.model")
module.exports={
    getBrandAdminPage:function (req,res){
        if(req.user.userType=="brandAdmin"){
            brandModel.findById({_id:req.user.brandId}).then(function(result){
                console.log("brandId",result)
                return res.status(200).send({data:result,status:200});
            }).catch(function(err){
                return res.status(500).send({error:"internal server error",status:500});
            })
            
        }else{
            return res.status(401).send({message:"unauthorized",status:401});
        }
    },
    createOutlet:function (req,res){
        var outlet=new outletModel({
            outletName:req.body.name,
            outletPinCode:req.body.pincode,
            brandId:req.body.id
        });

        outlet.save().then(function(result){
            console.log(result);
            return res.status(200).send({message:"created successfully",status:200});
        }).catch(function(err)
        {
            console.log(err);
            return res.status(400).send({message:"please enter valid and unique data",status:400});
        })
        

    },
    getOutlets:function (req,res){
        console.log(req.params);

        outletModel.find({brandId:req.params.id}).then(function(result){
            console.log(result);
            return res.status(200).send({data:result,status:200});
        }).catch(function(err)
        {
            console.log(err);
            return res.status(500).send({message:"please try later",status:500});
        })

    },
    createProduct:function (req,res){

    },
    getProductsByBrandId:function (req,res){

    },
    getOutletProducts:function (req,res){

    },
    createBrandAdmin:function (req,res){
        // var id=req.body.id;
        // req.body=req.body.admin;
        console.log(req.body);

        var valid=validation.validateUserData(req,res);
        console.log(valid);
        if(valid && req.body.id){
            var outletAdmin=new employeeModel({
                userName:req.body.userName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                number:req.body.number,
                password:req.body.password,
                outletId:req.body.id,
                userType:"outletAdmin"
    
            });

            outletAdmin.save().then(function(result){
                console.log(result);

                outletModel.findByIdAndUpdate({_id:req.body.id},{outletAdminId:result._id}).then(function(updated){
                    console.log(updated);
                    return res.status(200).send({message:"admin created successfully",status:200});
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).send({error:"internal server error",status:500});
                });
               
            }).catch(function(err){
                console.log(err);
                return res.status(500).send({error:"internal server error",status:500});
            })
        }else{
            return res.status(404).send({error:"data not found",status:404})
        }
    }
}