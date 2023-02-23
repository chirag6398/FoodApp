var orderModel=require("../model/order.model");

module.exports={
    createOrder:function (req,res){
        console.log(req.body);

        var order=new orderModel({
            customerName:req.body.name,
            customerPhoneNumber:req.body.number,
            items:req.body.item,
            outletId:req.body.outletId,
            orderId:req.body.orderId
        });
        console.log(order);
        order.save().then(function(result){
            console.log(result);
            return res.send(result);
        }).catch(function(err){
            console.log(err);

            return res.status(500).send({error:err});

        })
    }
}