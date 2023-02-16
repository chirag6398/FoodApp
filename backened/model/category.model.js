var mongoose=require("mongoose");

var categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true
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