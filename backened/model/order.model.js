var mongoose=require("mongoose");

var OrederSchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    items:[{
            category:{
                _id:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true
                },
                name:{
                    type:String,
                    required:true
                }
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
            },
            img:{
                type:String,
                required:true,
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
           
        },
        name:{
            type:String,
            required:true
        }

    },
    status:{
        type:String,
        enum:["preparing","pending","cancelled","serving","served"],
        required:true
    },
    brand:{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        name:{
            type:String,
            required:true,
        }
    }
    
},{timestamps:true});

module.exports=mongoose.model("order",OrederSchema);