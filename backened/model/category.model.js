var mongoose=require("mongoose");

var categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    categoryLogo:{
        type:String,

    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand"
    },isDeleted:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model("category",categorySchema);