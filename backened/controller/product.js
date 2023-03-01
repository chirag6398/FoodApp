var productModel = require("../model/product.model");
var s3Services=require("../service/awsS3.service");
// var uploadToS3=require("../service/awsS3.service");


module.exports={
    addProduct:function (req,res){
        
        if(req.file){
            return s3Services.updateToS3(req.file.buffer,req.file.originalname,req.file.mimetype).then(function(data){
                console.log(data);
                var image=data.Location;

                var product=new productModel({
                    name:req.body.name,
                    price:req.body.price,
                    'category.name':req.body.categoryName,
                    'brand.name':req.body.brandName,
                    'brand._id':req.body.brandId,
                    'category._id':req.body.categoryId,
                    description:req.body.description,
                    img:image
                    
                });
                product.save().then(function(result){
    
                    return res.status(200).send({status:200,message:"product added successfuly"});
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).send({error:err,status:500});
                })


            }).catch(function(err){
                console.log(err);
                return res.status(500).send({error:err,status:500});
            })
        }else{
            return res.status(500).send({message:"internal error",status:500});
        }
            
       
    },
    getProducts:function (req,res){
        try{
            
            productModel.find({'brand._id':req.body.brandId,'category._id':req.body.categoryId},{createdAt:0,isActive:0,isDeleted:0,outletIds:0,updatedAt:0}).then(function(result){
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
        console.log(req.file.mimetype);

        if(req.file){
            return s3Services.uploadToS3(req.file.buffer,req.file.originalname,req.file.mimetype).then(function(data){
                console.log(data);
                var image=data.Location;

                
                productModel.findByIdAndUpdate({_id:req.body._id},{
                    name:req.body.name,
                    price:req.body.price,
                    'category.name':req.body.categoryName,
                    'brand.name':req.body.brandName,
                    'brand._id':req.body.brandId,
                    'category._id':req.body.categoryId,
                    description:req.body.description,
                    img:image
                }).then(function(result){
                    return res.status(200).send({message:"updated with image"});
                }).catch(function(err){
                    return res.status(500).send({error:err,status:500});
                })

            }).catch(function(err){
                console.log(err);
                return res.status(500).send({error:err,status:500});
            })
      


           
        }else{
            productModel.findByIdAndUpdate({_id:req.body._id},{
                    name:req.body.name,
                    price:req.body.price,
                    'category.name':req.body.categoryName,
                    'brand.name':req.body.brandName,
                    'brand._id':req.body.brandId,
                    'category._id':req.body.categoryId,
                    description:req.body.description,
                   
                }).then(function(result){
                    return res.status(200).send({message:"updated"});
                }).catch(function(err){
                    return res.status(500).send({error:err,status:500});
                })
        }
        // console.log(req.file)

        //update product
        //update outlets product
        
    }
}