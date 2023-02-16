var mongoose=require("mongoose");
var bcrypt=require("bcrypt");
var crypt=require("crypto")

var employeeSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
    },
    resetToken:{
        type:String,
        required:false
    },
    expireToken:{
        type:Date,
        required:false
    },
    userType:{
        type:String,
        enum:["superAdmin","brandAdmin","outletAdmin","outletAgent"],
        default:"user",
        required:true
    },
    outletId:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:"outlet",
        
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:"outlet",
        
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



employeeSchema.pre('save',function(next){
    const employee = this

    
        bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError)
        } else {
            bcrypt.hash(employee.password, salt, function(hashError, hash) {
            if (hashError) {
                return next(hashError)
            }

            employee.password = hash
            next()
            })
        }
        })
    
});



employeeSchema.methods.generateResetToken=function(){
    console.log("resettokengenerator",this);
    crypt.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
        } else {
          this.resetToken = buffer.toString("hex");
          this.expireToken = Date.now() + 3600000;
        }
    });

}

module.exports=mongoose.model("employee",employeeSchema);

