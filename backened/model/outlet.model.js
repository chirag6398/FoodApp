var mongoose=require("mongoose");

var OutletSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    location:{
        address:{
            type:String,
            required:true,
        },
        pinCode:{
            type:Number,
            required:true
        },
        city:{
            type:String,
            required:true
        }
    }, 
    outletAdminId:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
    type:{
        type:String,
    },
    brand:{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
               
        },
        name:{
            type:String,
            required:true
        },
        logo:{
            type:String,
            required:true
        }
    },
    products:[{
        product:{
            name:{
                type:String,
                trim:true,
               
            },
            price:{
                type:Number,
                required:true
            },
            img:{
                type:String,
                
            },
            description:{
                type:String,
            },
            categoryId:{
                type:mongoose.Schema.Types.ObjectId,
                  
            },
            categoryName:{
                type:String
            },
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                  
            }

        }
    }
    ],
    description:{
        type:String,
        required:true,
        trim:true
    },
    contactInfo:{
        number:{
            type:Number,
            unique:true
        },
        email:{
            type:String,
            unique:true,
            trim:true
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
},{timestamps:true});
module.exports=mongoose.model("outlet",OutletSchema);