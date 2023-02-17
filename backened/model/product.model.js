var mongoose=require("mongoose");

var productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    img:{
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
    description:{
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