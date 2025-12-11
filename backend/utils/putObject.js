// import required modules
const { PutObjectCommand} = require("@aws-sdk/client-s3")
const {s3Client} = require('./s3Credentials.js');
const dotenv = require('dotenv');
// config the dotenv
dotenv.config();

// using aws sdk putObjectCommand we build putObject function
exports.putObject = async(file,imageKey)=>{
    try {
        const params = {
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:imageKey,
            Body:file.buffer,
            ContentType:file.mimetype
        }

        const command = new PutObjectCommand(params);
        
        // send request to server for adding new image 
        const Data = await s3Client.send(command);
        
        // checks if image uploaded successfully or not
        if (Data.$metadata.httpStatusCode !== 200){
            throw new Error("S3 Upload Failed!");
        };

        return imageKey;

    } catch (error) {
        console.log(error);
    }
}