var mongoose=require("mongoose");

var CategorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
        
    },
    categoryLogo:{
        type:String,

    },
    superCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"supercategory",
        required:true
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

module.exports=mongoose.model("category",CategorySchema);