var outletModel=require("../model/outlet.model");
var brandModel=require("../model/brand.model");
var productModel=require("../model/product.model");
var categoryModel=require("../model/category.model");
var mongoose = require("mongoose");

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
    categoryProduct:function (req,res){
        console.log(req.body);
//outlet id for removing products and display online those products which are not added
        return productModel.find({brandId:req.body.brandId,categoryId:req.body.categoryId}).then(function(result){
            console.log(result);
            return res.send(result);
        }).catch(function(err){
            console.log(err);
            return res.status(500).send({error:err});
        })

    },
    brandProducts:function (req,res){
        console.log(req.body);

        // productModel.aggregate([{
        //     $match:{
        //         brandId:req.body.brandId,
        //     },
        // },
        // {$unwind:"$products"},
        // {$filter:{
        //     input:"$products",
        //     as:"product",
        //     cond:{
        //         $ne:["$product.outletId",req.body.outletId]
        //     }
        // }
        // }
        // ]).exec(function(err,result){
        //     if(err){
        //         console.log(err);
        //     }else{
        //         console.log("products....",result);
        //     }
        // });
        // productModel.aggregate([
        //     {
        //         $match:{
        //             brandId:req.body.id
        //         },
        //         $group: {
        //             _id: '$categoryId',
        //             products: { $push: '$$ROOT' }
        //         }
        //     }
        //   ], function(err, result) {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log(result);
        //     }
        //   });
        return categoryModel.find({brandId:req.body.brandId}).then(function(result){
            console.log(result);
            return res.send(result)
        }).catch(function(err){
            console.log(err);
            return res.status(500).send({error:err});
        })

        // return productModel.find({brandId:req.body.brandId}).then(result=>{console.log(result)
        //     return res.send(result)
        // })

    },
    addProductToOutlet:function(req,res){
        console.log(req.body);

        outletModel.findByIdAndUpdate({_id:req.body.outletId},{
            $push:{
                products:{
                product:{
                    name:req.body.name,
                    price:req.body.price,
                    description:req.body.description,
                    categoryId:req.body.categoryId
                }}
            }
            
        }).then(function(result){
            console.log(result);

            productModel
            .findByIdAndUpdate({_id:req.body._id},
                {
                    $push:
                    {
                        outletIds:{
                            outletId:req.body.outletId
                        }
                    }
                })
            .then(result=>console.log(result)).catch(err=>console.log(err));
        }).catch(function(err){
            console.log(err);
        })


    },
    getProduct:function(req,res){
        var outletId=mongoose.Types.ObjectId(req.params.id)
        console.log("outletid",req.params.id)
        outletModel.aggregate([
            
                {
                    $match:{
                        _id:outletId,
                    }
                },
                {
                    $unwind:"$products"
                },
                { 
                    $group:{
                        _id:"$products.product.categoryId",
                        products:{$push:"$products.product"}
                    }
                }
                
            
        ]).exec(function(err,result){
            if(err){
                console.log(err);
                return res.status(500).send({error:err});
            }else{
                console.log("result",result);
                return res.status(200).send(result);
            }
        })
    },

    removeOutletProduct:function (req,res){
        console.log(req.body);
        

        outletModel.updateOne({_id:req.body.outletId,'products.product':{$exists:true}},{
            $pull:{
                products:{
                    'product.name':req.body.name
                }
                
            }
        }).then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log(err);
        })
    }
    
}