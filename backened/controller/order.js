var orderModel=require("../model/order.model");
var mongoose=require("mongoose");
module.exports={
    createOrder:function (req,res){
        console.log("data",req.body);

        var order=new orderModel({
            customer:req.body.customer,
            items:req.body.item,
            outlet:req.body.outlet,
            orderId:req.body.orderId,
            status:'pending',
            brand:req.body.brand
            
        });
        console.log(order);
        order.save().then(function(result){
            console.log(result);
            return res.send(result);
        }).catch(function(err){
            console.log(err);

            return res.status(500).send({error:err});

        })
    },
    getOrders:function(req,res){
        orderModel.find({'outlet._id':mongoose.Types.ObjectId(req.body.outletId)}).then(function(result){
            console.log(result);
            return res.send(result);
        }).catch(function(err){
            console.log(err);

            return res.status(500).send({error:err});

        })
    }
}