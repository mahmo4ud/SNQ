// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";

// export async function POST(request: Request) {
//   // Check content type
//   const contentType = request.headers.get("content-type");
//   if (!contentType || !contentType.includes("multipart/form-data")) {
//     return NextResponse.json(
//       { error: "Content-Type must be multipart/form-data" },
//       { status: 400 }
//     );
//   }

//   const formData = await request.formData();
//   const image = formData.get("image") as File;

//   if (!image) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const bytes = await image.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const uploadDir = path.join(process.cwd(), "public", "uploads");
//   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//   const filePath = path.join(uploadDir, image.name);
//   fs.writeFileSync(filePath, buffer);

//   const url = `/uploads/${image.name}`;
//   return NextResponse.json({ success: true, url });
// }
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          messageEn: "No image uploaded",
          messageAr: "لم يتم رفع أي صورة",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mimeType = image.type;
    const dataURI = `data:${mimeType};base64,${base64}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "uploads",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      messageEn: "Image uploaded successfully",
      messageAr: "تم رفع الصورة بنجاح",
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      {
        success: false,
        messageEn: "Upload failed",
        messageAr: "فشل رفع الصورة",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
