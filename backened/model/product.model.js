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
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    categoryName:{
        type:String
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand",
        required:true
    },
    //it is used only for displaying those products which are not added in outlets
    outletIds:[{
        outletId:{
            type:mongoose.Schema.Types.ObjectId,
            
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