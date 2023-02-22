var mongoose=require("mongoose");

var OrederSchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    items:[{
        item:{
            categoryId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            },
            name:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            }

        }
    }
    ],
    customerName:{
        type:String,
        required:true,
        trim:true
    },
    outletAgentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    customerPhoneNumber:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("category",OrederSchema);