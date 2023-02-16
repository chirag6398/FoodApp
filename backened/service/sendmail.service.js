var nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: false,
  tls: { rejectUnauthorized: false },
});

module.exports={
     sendWelcomeMailHandler:function (user){
        const mailOptions = {
            from: "no-reeply@gmail.com",
            to: user.email,
            subject: "Welcome",
            html: `<h3>Welcome ${user.firstName}</h3>
            <br>
            <p>your username is ${user.userName} & password is ${user.password}</p>
            
            `,
          };
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("mail not send ", error);
            
            }else{
                console.log("mail sent successfully",info)
            }
          });
      },
      sendResetMailHandler:function (result){
        const mailOptions = {
            from: "no-reeply@gmail.com",
            to: result.email,
            subject: "reset password",
            html: `<p>you requested for password reset
            <p>click in this <a href="http://127.0.0.1:5500/index.html#/resetPassword/${result.resetToken}">link</a> to reset password`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("mail not send ", error);
              
            }else{
                console.log(info)
            }
          });
      }
}