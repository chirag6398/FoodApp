var brandModel=require("../model/brand.model");
var employeeModel=require("../model/employee.model");
var validation=require("../service/validation.service");
var outletModel=require("../model/outlet.model");
var categoryModel=require("../model/category.model");
const productModel = require("../model/product.model");
var mongoose= require("mongoose");
module.exports={
    getAdminPage:function (req,res){
        // console.log(req.user);
        if(req.user.userType==="superAdmin"){
            return res.status(200).send({message:"eligible",user:req.user});
        }else{
            return res.status(401).send({message:"unauthorized user"});
        }
    },
    getBrands:function (req,res){
       

        if(req.user.userType==="superAdmin"){
           

            brandModel.find({}).then(function(result){
                return res.status(200).send({data:result,status:200});
            }).catch(function(err){
                return res.status(500).send({message:"internal server error",error:err,status:500});
            })

            
        }else{
            return res.status(401).send({message:"unauthorized user"});
        }
    },
    getBrandOutlets:function (req,res){
        if(req.user.userType==="superAdmin"){
           

            outletModel.find({}).then(function(result){
                return res.status(200).send({data:result,status:200});
            }).catch(function(err){
                return res.status(500).send({message:"internal server error",error:err,status:500});
            })

            
        }else{
            return res.status(401).send({message:"unauthorized user"});
        }
    },
    createBrand:function (req,res){
        if(req.user.userType==="superAdmin"){
            // console.log(req.body);

            var brand=new brandModel({
                name:req.body.name,
                'location.address':req.body.address,
                'location.city':req.body.city,
                'location.pinCode':req.body.pinCode,
                'contactInfo.number':req.body.number,
                'contactInfo.email':req.body.email,
                description:req.body.description
            });

            brand.save().then(function(result){
                // console.log(result);
                return res.status(200).send({message:"brand created successfully",status:200});
            }).catch(function(err){
                // console.log("forw",err)
                return res.status(404).send({message:"brandName not available",status:500});
            })

            
        }else{
            return res.status(401).send({message:"unauthorized user"});
        }
    },
    addBrandAdmin:function (req,res){
        // var id=req.body.admin.id;
        // req.body=req.body.admin;
        // console.log(req.body);
        // var id=req.body.brandId;

        // console.log(req.body);

        var valid=validation.validateUserData(req,res);
        console.log(valid,req.body);

        if(valid && req.body.brandId){
            var brandAdmin=new employeeModel({
                userName:req.body.userName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                number:req.body.number,
                password:req.body.password,
                'brand._id':req.body.brandId,
                'brand.name':req.body.brandName,
                userType:"brandAdmin",
                'location.address':req.body.address,
                'location.city':req.body.city,
                'location.pinCode':req.body.pinCode
    
            });

        return brandAdmin.save().then(function(result){
                // console.log(result);

                brandModel.findByIdAndUpdate({_id:req.body.brandId},{brandAdminId:result._id}).then(function(updated){
                    // console.log(updated);
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
        
        
    },
    deactivateBrand:function (req,res){
        try{
            
            req.body.brandId=mongoose.Types.ObjectId(req.body.brandId);
            brandModel.findByIdAndUpdate({_id:req.body.brandId},{isActive:false})
            .then(function(result){
                // console.log("result",result)
                return res.status({message:"deactivated"});
                
            }).catch(function(err){
                // console.log(err);
                return res.status(500).send({error:"server error"})
            })
        }catch(err){
            // console.log(err);
            return res.status(500).send({error:"server error"})
        }
    },
    activateBrand:function (req,res){
        try{
            
            req.body.brandId=mongoose.Types.ObjectId(req.body.brandId);
            brandModel.findByIdAndUpdate({_id:req.body.brandId},{isActive:true})
            .then(function(result){
                // console.log("result",result)
                return res.status({message:"deactivated"});
                
            }).catch(function(err){
                // console.log(err);
                return res.status(500).send({error:"server error"})
            })
        }catch(err){
            // console.log(err);
            return res.status(500).send({error:"server error"})
        }
    },
    deleteBrand:function(req,res){
        console.log(req.body);

        brandModel.findByIdAndUpdate({_id:req.body.brandId},{isDeleted:true}).then(function(result){
            return res.send({message:"deleted"});
        }).catch(function(err){
            return res.status(500).send({error:err});
        })
    }
}



// req.body.brandId=mongoose.Types.ObjectId(req.body.brandId);
// console.log(req.body);
// // brandModel.findById({_id:req.body.brandId}).then(result=>console.log(result));
// brandModel.findByIdAndUpdate({_id:req.body.brandId},{isActive:false}).then(function(result){
    // console.log("result",result)
//     // return res.status({message:"deactivated"});
//     outletModel.updateMany({brandId:req.body.brandId},{$set:{isActive:false}}).then(function(result){
//         categoryModel.updateMany({brandId:req.body.brandId},{$set:{isActive:false}}).then(function(result){
//             productModel.updateMany({brandId:req.body.brandId},{$set:{isActive:false}}).then(function(result){
//                 employeeModel.updateMany({brandId:req.body.brandId},{$set:{isActive:false}}).then(function(result){
                    // console.log(result);
//                     return res.status({message:"deactivated"});
//                 }).catch(function(err){
                    // console.log(err);
//                     return res.status(500).send({error:"server error"})
//                 })
//             }).catch(function(err){
                // console.log(err);
//                 return res.status(500).send({error:"server error"})
//             })
//         }).catch(function(err){
            // console.log(err);
//             return res.status(500).send({error:"server error"})
//         })
//     }).catch(function(err){
        // console.log(err);
//         return res.status(500).send({error:"server error"})
//     })
// }).catch(function(err){
    // console.log(err);
//     return res.status(500).send({error:"server error"})
// })
// }catch(err){
// console.log(err);
// }