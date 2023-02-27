var mongoose=require("mongoose");

var CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    logo:{
        type:String,

    },
    superCategory:{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    },
    brand:{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            ref:"outlet",
        },
        name:{
            type:String,
            required:true
        }
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

module.exports=mongoose.model("category",CategorySchema);