var brandModel=require("../model/brand.model");
var employeeModel=require("../model/employee.model");
var validation=require("../service/validation.service");
var outletModel=require("../model/outlet.model");
module.exports={
    getAdminPage:function (req,res){
        console.log(req.user);
        if(req.user.userType==="superAdmin"){
            return res.status(200).send({message:"eligible"});
        }else{
            return res.status(401).send({message:"unauthorized user"});
        }
    },
    getBrands:function (req,res){
        // brandModel.deleteMany({}).then(function(result){
        //     console.log(result);
        // });


        if(req.user.userType==="superAdmin"){
            // console.log(req.body);

           

            brandModel.find({}).then(function(result){
                // console.log("brands>>>>>",result);
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
            // console.log(req.body);

           

            outletModel.find({}).then(function(result){
                return res.status(200).send({data:result,status:200});
            }).catch(function(err){
                return res.status(500).send({message:"internal server error",error:err,status:500});
            })

            
        }else{
            return res.status(401).send({message:"unauthorized user"});
        }
    },
    getBrandProducts:function (req,res){

    },
    getOutletProducts:function (req,res){

    },
    createBrand:function (req,res){
        if(req.user.userType==="superAdmin"){
            console.log(req.body);

            var brand=new brandModel({
                brandName:req.body.brandName
            });

            brand.save().then(function(result){
                return res.status(200).send({message:"brand created successfully",status:200});
            }).catch(function(err){
                console.log("forw",err)
                return res.status(404).send({message:"brandName not available",status:500});
            })

            
        }else{
            return res.status(401).send({message:"unauthorized user"});
        }
    },
    addBrandAdmin:function (req,res){
        var id=req.body.id;
        req.body=req.body.admin;
        console.log(id,req.body);

        var valid=validation.validateUserData(req.body);

        if(valid && id){
            var brandAdmin=new employeeModel({
                userName:req.body.userName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                number:req.body.number,
                password:req.body.password,
                brandId:id,
                userType:"brandAdmin"
    
            });

            brandAdmin.save().then(function(result){
                console.log(result);

                brandModel.findByIdAndUpdate({_id:id},{brandAdminId:result._id}).then(function(updated){
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