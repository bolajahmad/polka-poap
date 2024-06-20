
import { ipfsBkt } from "@/utils/ipfs-bucket";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // set the bucket name
    ipfsBkt.createBucket("polka-poap-bucket");

    // upload the data
    // const uploadedData = await ipfsBkt.uploadData(file, "", metadata);
    return NextResponse.json({}, {
        status: 200,
      });
  } catch (e) {
    console.error("/upload error:", e);
    return NextResponse.json(e, {
      status: 500,
    });
  }
}
