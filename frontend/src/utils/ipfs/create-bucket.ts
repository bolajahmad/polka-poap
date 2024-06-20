import { env } from "@/config/environment";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: env.fbAccess,
    secretAccessKey: env.fbSecret,
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    s3ForcePathStyle: true
});

const params = {
    Bucket: "Polka-Poap-Bucket"
}

export async function createBucket() {
    s3.createBucket(params, (err, data)=>{
        if(err){
            console.log(err)
        } else {
            console.log("Bucket created", data)
        }
    })
}