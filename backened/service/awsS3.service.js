var aws=require("aws-sdk");

var awsConfig={
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY,
    region:process.env.REGION
  };

  var s3=new aws.S3(awsConfig);
  console.log(awsConfig);

  var uploadToS3=function(fileData){
    return new Promise(function(resolve,reject){
       var params={ 
        Bucket:process.env.BUCKETNAME,
        Key:(new Date().toString())+"jpg",
        Body:fileData
       }

       s3.upload(params,function(err,data){
        if(err){
            console.log(err);
          return reject(err);
        }else{
            console.log(data);
           return resolve(data);
        }
       })

    })
  }

module.exports=uploadToS3;


