import AWS from "aws-sdk";
import { env } from "process";

const s3 = new AWS.S3({
//   apiVersion: "2006-03-01",
signatureVersion: "v4",
  accessKeyId: env.fbAccess,
  secretAccessKey: env.fbSecret,
  endpoint: "https://s3.filebase.com",
  region: "us-east-1",
//   s3ForcePathStyle: true,
});

export async function listBuckets() {
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error when listing buckets", err);
    } else {
      console.log("Success when listing buckets", data);
    }
  });
}
