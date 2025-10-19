import { db } from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      code: 200,
      data: blogs,
      messageEn: "Fetched blogs successfully",
      messageAr: "تم جلب المقالات بنجاح",
    });
  } catch (_error) {
    return NextResponse.json(
      {
        code: 500,
        messageEn: "Internal server error",
        messageAr: "خطأ في الخادم",
      },
      { status: 500 }
    );
  }
};
