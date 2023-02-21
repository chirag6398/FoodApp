var mongoose=require("mongoose");

var superCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    logo:{
        type:String,

    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand"
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model("supercategory",superCategorySchema);