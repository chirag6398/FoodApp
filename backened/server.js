var express=require("express");
var app=express();
var passport=require("passport");
var cors=require("cors");
var morgan=require("morgan");
// var expressFileUpload=require("express-fileupload");
var dotenv=require("dotenv");
dotenv.config({ path: "./.env" });

require("./db/db");

var createAdminService=require("./service/createadmin.service");
createAdminService.createAdmin();


var port=process.env.PORT||5000;

app.use(passport.initialize());
app.use(cors());
// app.use(expressFileUpload());
app.use(express.json());
app.use(morgan("dev"));

app.use(require("./route/employee.route"));
app.use(require("./route/superAdmin.route"));
app.use(require("./route/brandAdmin.route"));
app.use(require("./route/outletAdmin.route"));
app.use(require("./route/product.route"));

app.listen(port,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("server started at port number : "+port);
    }
})

