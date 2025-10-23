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

    // تحويل الصورة إلى Base64
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mimeType = image.type;
    const dataURI = `data:${mimeType};base64,${base64}`;

    // رفع الصورة إلى Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "uploads",
    });

    // ✅ لاحظ إننا رجّعنا public_id كمان
    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id, // 👈 ده اللي بنستخدمه في الحذف
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
