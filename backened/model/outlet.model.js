var mongoose=require("mongoose");

var outletSchema=new mongoose.Schema({
    outletName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    outletPinCode:{
        type:Number,
        required:true
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand",
        required:true
    },
    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    }
    ],
    isDeleted:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});
module.exports=mongoose.model("outlet",outletSchema);