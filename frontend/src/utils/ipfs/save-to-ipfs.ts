import { env } from "@/config/environment";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    // apiVersion: '2006-03-01',
    accessKeyId: env.fbAccess,
    secretAccessKey: env.fbSecret,
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    signatureVersion: "v4",
    // s3ForcePathStyle: true
  });

export async function saveToIpfs(params: AWS.S3.PutObjectRequest, file?: File | Blob) {
    console.log({ env })
    const request = s3.putObject(params);
        request.on('httpHeaders', (statusCode, headers) => {
            console.log(`CID: ${headers['x-amz-meta-cid']}`);
        });
        request.send();
}