var mongoose=require("mongoose");

var BrandSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        unique:true
    },
    logo:{
        type:String
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
    //to check that its admin is created or not and also for updating user using its id
    brandAdminId:{
        type:mongoose.Schema.Types.ObjectId,
               
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
    description:{
        type:String,
        trim:true,
        required:true
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

module.exports=mongoose.model("brand",BrandSchema);