var mongoose=require("mongoose");

var OutletSchema=new mongoose.Schema({
    outletName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    outletPinCode:{
        type:Number,
        required:true
    },
    outletAdminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"employee",
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand",
        required:true
    },
    products:[{
        product:{
            name:{
                type:String,
                trim:true,
                // required:true,
                // unique:true
            },
            price:{
                type:Number,
                // required:true
            },
            img:{
                type:String,
                
            },
            description:{
                type:String,
            },
            categoryId:{
                type:mongoose.Schema.Types.ObjectId
            }
        }
    }
    ],
    isDeleted:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});
module.exports=mongoose.model("outlet",OutletSchema);