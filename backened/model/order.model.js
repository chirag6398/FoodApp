var mongoose=require("mongoose");

var OrederSchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    items:[{
        
            categoryId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            },
            _id:{

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
    ],
    customer:{
        name:{
            type:String,
            required:true,
            trim:true
        },
        number:{
            type:Number,
            required:true
        }
    },
    outlet:{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"outlet"
        },
        name:{
            type:String,
            required:true
        }

    }
    
},{timestamps:true});

module.exports=mongoose.model("order",OrederSchema);