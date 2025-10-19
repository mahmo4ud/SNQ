import { db } from "@/config/db";
import { verifyAuthToken } from "@/lib/verify-token";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { titleEn, titleAr, contentEn, contentAr } = await request.json();
  try {
    if (!titleEn || !titleAr || !contentEn || !contentAr) {
      return NextResponse.json(
        {
          code: 400,
          messageEn:
            "All fields are required (titleEn, titleAr, contentEn, contentAr)",
          messageAr: "جميع الحقول مطلوبة (العنوان، المحتوى باللغتين)",
        },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get("authorization");
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          code: 401,
          messageEn: "No authorization token provided",
          messageAr: "لم يتم توفير رمز التوثيق",
        },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    let payload;
    try {
      payload = verifyAuthToken(token);
    } catch (err) {
      return NextResponse.json(
        {
          code: 401,
          messageEn: (err as Error).message || "Invalid or expired token",
          messageAr: "رمز التوثيق غير صالح أو منتهي الصلاحية",
        },
        { status: 401 }
      );
    }

    await db.blog.create({
      data: {
        titleEn,
        titleAr,
        contentEn,
        contentAr,
        userId: payload.userId,
      },
    });

    return NextResponse.json(
      {
        code: 201,
        messageEn: "Blog created successfully",
        messageAr: "تم إنشاء المقال بنجاح",
      },
      { status: 201 }
    );
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
