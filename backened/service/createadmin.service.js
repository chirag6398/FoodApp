var employeeModel=require("../model/employee.model");
var bcrypt=require("bcrypt");

module.exports={
    createAdmin:function(){
        employeeModel.findOne({userType:"superAdmin"}).then(function(result){
            if(!result){
                var admin=new employeeModel({
                    firstName:"admin",
                    LastName:"",
                    password:"Admin1",
                    userName:"admin1",
                    number:"7896541263",
                    email:"admin1@gmail.com",
                    userType:"superAdmin"
                });
                admin.save().then(function(result){
                    // console.log(result);
                }).catch(function(err){
                    console.log(err);
                });

            }else{
                // console.log(result)

                // console.log("admin is already created");
            }
        }).catch(function(err){
            console.log(err);
        })
        
    }
}