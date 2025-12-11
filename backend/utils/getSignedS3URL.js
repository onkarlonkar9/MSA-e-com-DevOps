const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Credentials");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.getSignedS3URL = async (key, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const signedURL = await getSignedUrl(s3Client, command, {
    expiresIn,
  });
  return signedURL;
};