var productModel = require("../model/product.model");
var uploadToS3=require("../service/awsS3.service");


module.exports={
    addProduct:function (req,res){
        console.log(req.body);
        console.log(req.file)
        console.log(req.file.mimetype);
        if(req.file){
            uploadToS3(req.file.buffer).then(function(data){
                console.log(data);
                req.body.image=data.location;

            }).catch(function(err){
                console.log(err);
            })
        }
            // var product=new productModel({
            //     name:req.body.name,
            //     price:req.body.price,
            //     category:req.body.category,
            //     brand:req.body.brand,
            //     description:req.body.description,
            //     
            // });
            // product.save().then(function(result){
            //     return res.status(200).send({status:200,message:"product added successfuly"});
            // }).catch(function(err){
            //     return res.status(500).send({error:err,status:500});
            // })
       
    },
    getProducts:function (req,res){
        try{
            
            productModel.find({categoryId:req.body.categoryId,brandId:req.body.brandId},{createdAt:0,isActive:0,isDeleted:0,outletIds:0,updatedAt:0}).then(function(result){
                return res.status(200).send(result);
            }).catch(function(err){
                return res.status(500).send({error:err,status:500});
            })
        }catch(err){
            console.log(err);
            return res.status(500).send({error:err,status:500});
        }
    },
    updateProduct:function(req,res){
        console.log(req.body);
        console.log(req.file);

        //update product
        //update outlets product
        
    }
}