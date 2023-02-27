var brandModel=require("../model/brand.model");
var outletModel=require("../model/outlet.model");
var validation=require("../service/validation.service");
var employeeModel=require("../model/employee.model");
var superCategoryModel=require("../model/superCategory.model");
var categoryModel = require("../model/category.model");
var mongoose=require("mongoose");

module.exports={
    getBrandAdminPage:function (req,res){
        if(req.user.userType=="brandAdmin"){
            brandModel.findById({_id:req.user.brand._id}).then(function(result){
                // console.log("brandId",result);
                return res.status(200).send({data:result,status:200});
            }).catch(function(err){
                return res.status(500).send({error:"internal server error",status:500});
            })
            
        }else{
            return res.status(401).send({message:"unauthorized",status:401});
        }
    },
    createOutlet:function (req,res){
        console.log(req.body);

        var outlet=new outletModel({
            name:req.body.name,
            type:req.body.type,
            description:req.body.description,
            'location.address':req.body.address,
            'location.city':req.body.city,
            'location.pinCode':req.body.pinCode,
            'contactInfo.number':req.body.number,
            'contactInfo.email':req.body.email,
            'brand._id':req.body.brandId,
            'brand.name':req.body.brandName
        });

        outlet.save().then(function(result){
            console.log(result);
            return res.status(200).send({message:"created successfully",status:200});
        }).catch(function(err)
        {
            console.log("fenfi",err);
            return res.status(400).send({message:"please enter valid and unique data",status:400});
        })
        

    },
    getOutlets:function (req,res){
        console.log(req.params);

        outletModel.find({'brand._id':req.params.id}).then(function(result){
            console.log(result);
            return res.status(200).send({data:result,status:200});
        }).catch(function(err)
        {
            console.log(err);
            return res.status(500).send({message:"please try later",status:500});
        })

    },
    
    createOutletAdmin:function (req,res){
        // var id=req.body.id;
        // req.body=req.body.admin;
        console.log(req.body);


        //pending adding brandId

        var valid=validation.validateUserData(req,res);

        console.log(valid);
        if(valid && req.body.outletId && req.body.brandId && req.body.outletName && req.body.brandName ){
            var outletAdmin=new employeeModel({
                userName:req.body.userName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                number:req.body.number,
                password:req.body.password,
                userType:"outletAdmin",
                'outlet._id':req.body.outletId,
                'outlet.name':req.body.outletName,
                'outlet.location':req.body.location,
                'brand._id':req.body.brandId,
                'brand.name':req.body.brandName,
                'outlet.type':req.body.outletType,
                'location.address':req.body.address,
                'location.city':req.body.city,
                'location.pinCode':req.body.pinCode
    
            });

            return outletAdmin.save().then(function(result){
                console.log(result);

                outletModel.findByIdAndUpdate({_id:req.body.outletId},{outletAdminId:result._id}).then(function(updated){
                    // console.log(updated);
                    return res.status(200).send({message:"admin created successfully",status:200});
                }).catch(function(err){
                    // console.log(err);
                    return res.status(500).send({error:"internal server error",status:500});
                });
               
            }).catch(function(err){
                // console.log(err);
                return res.status(500).send({error:"internal server error",status:500});
            })
        }else{
            return res.status(404).send({error:"data not found",status:404})
        }
    },
    addCategory:function (req,res){
   
        var category=new categoryModel({
            name:req.body.name,
            brand:req.body.brand,
            superCategory:req.body.superCategory,
        });

       

        category.save().then(function(result){
            console.log("added category",result);
            return res.status(200).send({message:"successfull",status:200});
        }).catch(function(err){
            console.log(err);
            return res.status(500).send({error:"internal server error",status:500});
        })
    },
    getCategory:function(req,res){
        console.log("",req.body);
        categoryModel.find({'brand._id':req.body.brandId,'superCategory._id':req.body.superCategoryId}).then(function(result){
            console.log(result);
            return res.status(200).send(result);
        }).catch(function(err){
            return res.status(500).send({error:err,status:500});
        })
    },
    addSuperCategory:function (req,res){
        
        var superCategory=new superCategoryModel({
            name:req.body.categoryName,
            brand:req.body.brand
        });

        return superCategory.save().then(function(result){
            console.log(result);
            return res.send(result);
        }).catch(function(err){
            return res.status(500).send(err);
        })

    },
    getSuperCategory:function (req,res){
        // console.log(req.params.id)
        superCategoryModel.find({'brand._id':mongoose.Types.ObjectId(req.params.id)}).then(function(result){
            console.log(result);
            return res.send(result);
        }).catch(function(err){
            console.log(err);
            return res.status(500).send({error:err});
        })
        //send super category
    }
}