
import { ipfsBkt } from "@/utils/ipfs-bucket";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("artworkId") as File;
    const metadata = {
        description: formData.get("description") as string,
        title: formData.get("title") as string,
        slots: Number(formData.get("attendeesCount") as string),
        website: formData.get("website") as string,
    }
    // set the bucket name
    ipfsBkt.switchBucket("polka-poap-bucket");

    // upload the data
    const uploadedData = await ipfsBkt.uploadData(file, "", metadata);
    return NextResponse.json(uploadedData, {
        status: 200,
      });
  } catch (e) {
    console.error("/upload error:", e);
    return NextResponse.json(e, {
      status: 500,
    });
  }
}
