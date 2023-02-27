var mongoose=require("mongoose");

var ProductSchema=new mongoose.Schema({
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
        
    },
    //used to find products of perticular category under same brand 
    category:{
       _id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
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
            ref:"brand",
            required:true
        },
        name:{
            type:String,
            required:true
        }
    },
    //it is used only for displaying those products which are not added in outlets
    outlet:[{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"outlet"
        }
    }
    ],
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

module.exports=mongoose.model("product",ProductSchema)