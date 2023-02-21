var mongoose=require("mongoose");

var OrederSchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    customerName:{
        type:String,
        required:true,
        trim:true
    },
    outletAgentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    customerPhoneNumber:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model("category",OrederSchema);