const {PutObjectCommand,
    S3Client
} = require("@aws-sdk/client-s3");
const { getSignedUrl }  = require("@aws-sdk/s3-request-presigner")
require('dotenv').config()

const BUCKET_NAME = 'chiawsbucket88';
const credentials = {
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  };
  console.log(credentials.accessKeyId, credentials.secretAccessKey)
  
const s3 = new S3Client({ region: "ap-southeast-1", credentials: credentials});

const generateUrl = async (username,contentType) => {
    let signedUrl;
    const fileExtension = contentType.split('/')[1]
    const filename = `${username}/image.${fileExtension}`
    const publicUrl = getPublicUrl(filename)
    const command = new PutObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
    try {
        signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    } catch (err) {
        console.error(`Error generating pre-signed url: ${err.message}`);
        throw new Error('Error generating pre-singed url');
    }

    return {signedUrl, publicUrl};
}


const getPublicUrl = (filename) => {
    const publicUrl = `https://${BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${filename}`
    console.log(publicUrl)

    return publicUrl;
}

module.exports = {generateUrl};