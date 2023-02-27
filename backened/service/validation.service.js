module.exports={
    validateUserData:function(req,res){
        var userName=req.body.userName;
        var lastName=req.body.lastName;
        var firstName=req.body.firstName;
        var password=req.body.password;
        var cpassword=req.body.cpassword;
        var number=req.body.number;
        var email=req.body.email;
        var address=req.body.address;
        var pinCode=req.body.pinCode;
        var city=req.body.city;

        if(!userName  || !firstName || !password || !number || !cpassword || !address || !pinCode || !city){
         return res.status(404).send({message:"please fill all fields"});
          
      }
        

        userName=userName.trim();
        if(lastName)
            lastName=lastName.trim();
        firstName=firstName.trim();
        password=password.trim();
        cpassword=cpassword.trim();
        email=email.trim();
        

      if(!userName  || !firstName || !password || !number || !cpassword || !address || !pinCode || !city){
         return res.status(404).send({message:"please fill all fields"});
          
      }

      if(userName.length<3){
           return res.status(403).send({message:"length of userName must be greater then 3"});
        }

        var rgExEmail=/^([a-z A-Z 0-9 \. -]+)@([0-9 a-z A-Z -]+).([a-z]{2,8})(.[a-z]{2,4})?$/;

        if(!rgExEmail.test(email)){
           return res.status(403).send({message:"please enter valid email"});
        }
        var regExLowerCase=/[a-z]/;
        var regExUpperCase=/[A-Z]/;
        var regExNumbericCharacter=/[0-9]/;

        if(!regExLowerCase.test(password) || !regExNumbericCharacter.test(password) || !regExUpperCase.test(password) || password.length<5 || password.length>8){
           return res.status(403).send({message:"password does not fill criteria"})
        }

        if(password!==cpassword){
           return res.status(403).send({message:"confirm password does not match password"});
        }

        var rgExNumber=/^[6-9]{1}[0-9]{9}$/;

        if(!rgExNumber.test(number)){
           return res.status(403).send({message:"number is wrong"});
        }

        return true;


        

    }
}