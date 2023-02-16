var mongoose=require("mongoose");

var productSchema=new mongoose.Schema({
    productName:{
        type:String,
        trim:true,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productImg:{
        type:String,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand",
        required:true
    },
    productDescription:{
        type:String,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

module.exports=mongoose.model("product",productSchema)