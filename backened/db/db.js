var mongoose=require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
   
    useUnifiedTopology: true,
    
  }).then(function(){
    console.log("database connected");
}).catch(function(err){
    console.log("database not connected",err);
})