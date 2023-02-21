var mongoose=require("mongoose");

var brandSchema=new mongoose.Schema({
    brandName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        unique:true
    },
    brandLogo:{
        type:String
    },
    //to check that its admin is created or not and also for updating user using its id
    brandAdminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"employee",
        
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

module.exports=mongoose.model("brand",brandSchema);